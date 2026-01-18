
import { GoogleGenerativeAI } from "@google/generative-ai";

// #region agent log
const logToBackend = (msg: string, data: any = {}, hypothesisId: string = 'B') => {
  console.log(`[AI Log] ${msg}`, data);
  fetch('http://127.0.0.1:7243/ingest/3747187a-d8aa-46a4-806e-deb4927df6d2',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      location:'geminiService.ts',
      message:msg,
      data:data,
      timestamp:Date.now(),
      sessionId:'debug-session',
      hypothesisId:hypothesisId
    })
  }).catch(()=>{});
};
// #endregion

const getApiKey = () => {
  let key = '';
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      key = process.env.API_KEY;
    } else if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      key = process.env.GEMINI_API_KEY;
    } else {
      // @ts-ignore
      key = import.meta.env?.VITE_GEMINI_API_KEY || '';
    }
  } catch (e) {
    console.error('Error accessing env vars:', e);
  }
  return key;
};

const apiKey = getApiKey();
logToBackend('Initializing GoogleGenerativeAI', { apiKeyPresent: !!apiKey });
const genAI = new GoogleGenerativeAI(apiKey);

export const getEduInsight = async (query: string) => {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3747187a-d8aa-46a4-806e-deb4927df6d2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:11',message:'getEduInsight called',data:{query},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: query }] }],
      generationConfig: {
        temperature: 0.7,
      },
    });
    
    // The system instruction can be added as a prefix to the query or via the new systemInstruction property if supported by the model/SDK version
    // For simplicity and compatibility, I'll use a prefix approach or check if systemInstruction is available.
    // In gemini-pro, we can just send it as part of the prompt.
    
    const prompt = `You are an AI assistant for Delta7 Edu-Frameworks. 
    You represent Suram Mohan Kumar's philosophy: "Building Systems, Not Shortcuts". 
    Your goal is to explain the HTMF (Holistic Teaching Mastery Framework) and HSMF (Holistic Student Mastery Framework).
    HTMF modules: Classroom Teaching Mastery, Correction Quality Index, Learning Tools Optimization, Professional Integrity.
    HSMF focus: 360-degree diagnostic tracking, 5-level scale, parent-teacher synergy.
    Be professional, academic, and visionary.
    
    User Query: ${query}`;

    const finalResult = await model.generateContent(prompt);
    return finalResult.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to the Delta7 knowledge base right now. Please try again later or contact us directly.";
  }
};

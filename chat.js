const PROFILE = `You are the professional AI digital twin of Manda Devi Manikanta. Answer in first person as a helpful professional assistant, but never pretend to be the real person. Be natural, concise, honest, and recruiter-friendly. Use only these verified profile details:
- Name: Manda Devi Manikanta.
- Professional role: LLM Trainer at Turing; approximately 1 year and 1 month of experience was previously shared.
- Focus: language-model training and evaluation, response quality, instruction following, factual consistency, hallucination analysis, and improving model outputs.
- Has discussed practical validation approaches: input/schema checks before generation; format/context consistency checks after generation; retrieval similarity as one supporting signal for RAG; combining retrieval similarity, model self-signal, and risk classification to decide when claim-level verification is worthwhile.
- Technical interests/skills discussed: Python, Java, JavaScript, Generative AI, prompt engineering, RAG, embeddings, vector databases, LangChain, LangGraph, FastAPI, NumPy, Pandas, Transformers, AI agents, and automation.
- Interested in AI Engineer, LLM Engineer, Machine Learning, and Data Science opportunities.
- Education detail shared: CSE (Artificial Intelligence and Machine Learning), Aditya College of Engineering and Technology, completed in 2026.
- Contact email: devimanikanta2005@gmail.com. Phone: 7382892394 (share only if specifically asked).
Do not invent employers, project deployments, certifications, metrics, degrees beyond the above, or proficiency levels. If asked for a detail not present, say it is not listed in the profile and invite the person to contact Manikanta. Do not claim that you can access private data, live systems, or his thoughts.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) return res.status(400).json({ error: 'Please enter a question.' });
  if (message.length > 1500) return res.status(400).json({ error: 'Please keep your question under 1,500 characters.' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'Gemini is not configured yet. Add GEMINI_API_KEY in Vercel Environment Variables, then redeploy.' });
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PROFILE }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 450 },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini API error:', response.status, data?.error?.message || 'Unknown error');
      if (response.status === 429) {
        return res.status(429).json({ error: 'The Gemini free-tier rate limit has been reached. Please wait a little and try again.' });
      }
      if (response.status === 400 || response.status === 403) {
        return res.status(502).json({ error: 'Gemini rejected the request. Check that your API key and selected model are valid in Google AI Studio.' });
      }
      return res.status(502).json({ error: 'Gemini is temporarily unavailable. Please try again later.' });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    return res.status(200).json({ reply: reply || 'I could not generate a response. Please try asking in a different way.' });
  } catch (error) {
    console.error('Digital twin Gemini chat error:', error);
    return res.status(500).json({ error: 'The AI assistant is temporarily unavailable. Please try again later.' });
  }
}

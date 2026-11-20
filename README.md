# Manda Devi Manikanta — AI Digital Twin

A responsive, light-theme portfolio and AI digital twin website. The chat backend uses the Gemini Developer API (Google AI Studio) through a Vercel serverless function.

## Included
- `index.html` — responsive portfolio and chat UI
- `assets/profile.jpg` — supplied professional photograph
- `api/chat.js` — server-side Gemini API endpoint
- `package.json` — Vercel development dependency

## Deploy to Vercel
1. Upload these project files to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `GEMINI_API_KEY` = your Google AI Studio API key
   - Optional: `GEMINI_MODEL` = `gemini-2.5-flash` (the default)
4. Apply the variable to Production (and Preview/Development if needed), save, then redeploy.
5. Test the chat on the deployed site.

Create a Gemini API key at https://aistudio.google.com/app/apikey. Free-tier availability, model access, rate limits, and data-use terms depend on Google's current policies and your region/account. Check https://ai.google.dev/gemini-api/docs/pricing before relying on free usage.

## Local development
```bash
npm install
```
Create a local `.env` file containing `GEMINI_API_KEY=your_key`, then run:
```bash
npx vercel dev
```
Never commit `.env`, expose the key in `index.html`, or put it in client-side JavaScript.

## Profile links
- LinkedIn: https://www.linkedin.com/in/manda-devimanikanta-633480260
- GitHub: https://github.com/DeviManikantaManda

## Before publishing
- Your professional photograph is included at `assets/profile.jpg`.
- Review experience, education, skills, and project wording for accuracy.
- The API key must remain a server-side Vercel environment variable.

# Somil Arora: Portfolio

Personal site with an AI assistant that answers questions about my work and checks fit against pasted job descriptions.

Live: https://www.somilarora.com

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Groq and OpenRouter (free AI models)

## Run locally

```bash
npm install
cp .env.example .env.local   # add a free API key for live AI answers
npm run dev
```

Without an API key the site still works, and the assistant uses built-in offline answers.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/content/profile.ts` | All site content, also used as the assistant's knowledge |
| `src/app/api/chat/route.ts` | Streaming assistant endpoint |
| `src/lib/assistant-prompt.ts` | Assistant instructions |
| `src/lib/offline-answers.ts` | Fallback answers when the API is unavailable |
| `src/components/` | Page sections and the assistant panel |

## Deploying

Deploys on Vercel. Add `GROQ_API_KEY`, `OPENROUTER_API_KEY`, or both under Project Settings > Environment Variables. Both have free tiers. Providers are tried in the order set in the chat route, and when their limits are reached the assistant switches to offline answers.

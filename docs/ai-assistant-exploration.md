# AI Portfolio Assistant — Exploration

## The Idea

Replace the current command palette with a dual-mode interface: it stays a fast navigator (type a page name, press Enter), but also accepts natural language. Ask it *"what did you build at Purgo AI?"* and it answers in context, citing the right details, and offers to navigate to the relevant page.

The mental model for visitors: **"Ask Harish anything."** It's a recruiter asking about tech stack. It's an engineer curious about how a specific system was built. It's someone checking if you'd be a fit for their team.

---

## What It Knows

The assistant has access to a pre-built knowledge base scraped from the portfolio itself and GitHub:

| Source | Content |
|---|---|
| Portfolio pages | Experience, projects, skills, research, about, certifications, leadership, hobbies |
| GitHub READMEs | Architecture notes, setup instructions, design decisions per project |
| Project descriptions | Tech stack, scope, outcomes, deployment details |

Knowledge is baked in at build time — no live GitHub fetching at query time. This keeps latency low and avoids rate limits.

---

## Architecture Options

### Option A — Cloudflare Worker Proxy (Recommended)
A ~30-line Worker sits between the site and the Claude API. It holds the API key server-side, accepts `{ question, context_chunks }` from the browser, and streams a response back.

- **Pros:** API key never exposed, streaming responses, can add rate limiting
- **Cons:** One extra deployment (Cloudflare free tier, ~5min setup)
- **Cost:** Essentially zero — Claude Haiku is ~$0.25/1M tokens, a portfolio gets maybe 1k questions/month

### Option B — Direct Client-Side API Call
Call Claude API directly from the browser. API key lives in the bundle.

- **Pros:** Zero infrastructure, ships faster
- **Cons:** Key is visible in devtools — someone can steal it and run up your bill. Can cap spend in Anthropic dashboard, but still not great.

### Option C — Static FAQ Only
Pre-written answers, keyword matching, no LLM.

- **Pros:** Zero cost, zero latency, no API
- **Cons:** Brittle, can't answer novel questions, looks unsophisticated for an AI engineer's portfolio

**Recommendation: Option A.** The Cloudflare Worker is minimal work and the right call. An AI engineer's portfolio should handle its secrets properly.

---

## UX Design

The command palette becomes a single input that handles both modes:

```
> navigate to projects          → navigates instantly
> how does the RAG pipeline work? → streams an answer
> tell me about your thesis     → streams an answer + "View Research →" button
```

**No separate chat UI.** The same palette handles both. Short answers (< 2 sentences) are inline. Longer answers expand the panel downward with a scroll area. A "Go to [page] →" button appears when the answer is clearly about a specific page.

**Response style:** Concise, first-person, professional. Not "Harish has experience in..." but "I built this as..." The assistant speaks as Harish.

**Suggested questions** appear on first open (before any input) to prompt interaction:
- "What did you build at Purgo AI?"
- "Which projects use LangGraph?"
- "What's your thesis about?"
- "Are you open to full-time roles?"

---

## Knowledge Base Build Process

At build time (or manually refreshed), a script:
1. Reads all page data files (projects, experience, research, etc.) from the React source
2. Fetches `README.md` from each GitHub repo listed in projects
3. Chunks everything into ~500-token pieces with metadata (source page, project name)
4. Writes a single `public/knowledge-base.json`

At query time, the assistant:
1. Does a simple keyword/TF-IDF search against the knowledge base (client-side, no vector DB needed at this scale)
2. Picks the top 3-5 most relevant chunks
3. Sends `system prompt + chunks + question` to Claude via the Worker

No vector database needed. At this content volume (~30 documents, ~50k tokens total), keyword search is sufficient and avoids complexity.

---

## What It Will NOT Do

- Answer questions outside Harish's portfolio (it's not a general assistant)
- Make up facts — if it doesn't know, it says so and offers to navigate to the relevant page
- Retain conversation history across sessions

---

## Open Questions Before Implementation

1. **Deploy target for the Worker:** Cloudflare (free) or Vercel Edge Functions (also free, if you have a Vercel account)?
2. **Model:** Claude Haiku (fast, cheap) or Sonnet (smarter, slower, ~10x more expensive)?
3. **README fetching:** Automated at build time or manual refresh when you update a project?
4. **Tone:** Should it be formal ("I have experience building...") or casual ("I built this because...")?

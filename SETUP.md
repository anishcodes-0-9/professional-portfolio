# Anish Krishnan — Portfolio Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file (copy from .env.example)
cp .env.example .env

# 3. Open .env and add your OpenAI key:
#    REACT_APP_OPENAI_API_KEY=sk-...your key...

# 4. Start dev server
npm start
```

## File to edit for your content

**`src/data/anishData.js`** — this is the single source of truth for everything:
- `personalInfo` → name, email, github, linkedin URLs
- `aboutCards` → the 4 cards in the About section
- `experiences` → your work history timeline
- `skills` → all your tech skills
- `projects` → your projects/work engagements
- `certifications` → your certs strip
- `chatbotContext` → what the AI chatbot knows about you

## Setting up the Contact Form (optional)

The contact form uses Formspree (free tier is fine):
1. Go to https://formspree.io and sign up
2. Create a new form → copy the form ID
3. In `src/container/Footer/Footer.jsx`, replace `YOUR_FORM_ID` in the fetch URL

## Chatbot

The 🤖 button in the bottom-right corner uses OpenAI GPT-4o-mini.
- Requires `REACT_APP_OPENAI_API_KEY` in your `.env`
- Get a key at https://platform.openai.com/api-keys
- The chatbot is trained on `chatbotContext` in `anishData.js` — keep that up to date!

## Deploying to Vercel

```bash
# Build
npm run build

# Push to GitHub, then import on vercel.com
# Add REACT_APP_OPENAI_API_KEY as an Environment Variable in Vercel dashboard
```

## Sections

| Section | Component | Data Source |
|---------|-----------|-------------|
| Hero / Header | `Header.jsx` | `personalInfo`, `taglines` |
| About | `About.jsx` | `aboutCards`, `certifications` |
| Work/Projects | `Work.jsx` | `projects` |
| Skills + Experience | `Skills.jsx` | `skills`, `experiences` |
| Contact | `Footer.jsx` | `personalInfo.email` |
| AI Chatbot | `Chatbot.jsx` | `chatbotContext` |

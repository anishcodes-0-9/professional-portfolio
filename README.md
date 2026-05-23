# Anish Krishnan Portfolio

An interactive portfolio built to present Anish Krishnan's resume, work history, enterprise engagements, certifications, personal projects, and recruiter-focused AI assistant in a polished single-page experience.

Live site: [anish-krishnan-portfolio.vercel.app](https://anish-krishnan-portfolio.vercel.app/)

## Overview

This project is designed as a resume-backed portfolio rather than a generic landing page. The content is structured to help recruiters, hiring managers, and collaborators quickly understand:

- current role and experience
- backend and frontend strengths
- enterprise project depth
- certifications and credibility
- contact options and resume access
- AI-assisted Q&A grounded in real portfolio data

The site is intentionally data-driven so the UI, chatbot context, and maintainable content all stay in sync.

## Current Profile Highlights

- 4+ years of engineering experience
- Current role: Senior Software Engineer at Debut Infotech
- Previous experience: Alignerr and Cognizant
- Core stack: Java, Python, React, Next.js, Node.js, Spring Boot, AWS
- Strength areas: distributed systems, observability, backend reliability, payments, retail systems, and AI evaluation
- Certifications: AWS Cloud Practitioner, AWS Developer Associate, AWS AI Practitioner, GitHub Copilot Certification

## Features

- Responsive React portfolio with polished desktop and mobile layouts
- Hero section with guided navigation into enterprise or personal work
- Work section split into:
  - Work History
  - Enterprise Projects
  - Personal Projects
  - Certifications
- Resume button linked to the latest PDF
- Certificate buttons that open real certification PDFs
- Contact section with direct email fallback behavior
- Recruiter-oriented chatbot with:
  - structured portfolio context
  - shared data source with the UI
  - local fallback answers for common recruiter questions

## Tech Stack

- React 17
- Sass
- Framer Motion
- React Icons
- Create React App

## Project Structure

```text
src/
  components/
  container/
    About/
    Chatbot/
    Footer/
    Header/
    Skills/
    Work/
  constants/
  data/
    anishData.js
  wrapper/
public/
  *.pdf
```

## Source Of Truth

Most portfolio content lives in:

[`src/data/anishData.js`](./src/data/anishData.js)

This file powers:

- personal information
- about cards
- work history
- enterprise projects
- personal projects
- certifications
- skills and timeline data
- chatbot knowledge base

If you want to update the visible portfolio and the chatbot together, this is the main file to edit first.

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npm start
```

The portfolio runs at:

```text
http://localhost:3000
```

### 3. Create a production build

```bash
npm run build
```

## Environment Variables

Optional `.env` values:

```bash
REACT_APP_OPENAI_API_KEY=your_key_here
REACT_APP_FORMSPREE_FORM_ID=your_form_id_here
```

Notes:

- `REACT_APP_OPENAI_API_KEY` is used by the chatbot in the client.
- `REACT_APP_FORMSPREE_FORM_ID` is optional. Without it, the contact form falls back to an email draft flow.

## Deployment

This portfolio is suitable for Vercel deployment.

Recommended flow:

1. Push the repository to GitHub
2. Import the repository into Vercel
3. Keep the default Create React App build settings
4. Add environment variables if needed
5. Deploy and verify:
   - resume download
   - certificate links
   - contact flow
   - chatbot answers
   - mobile layout

## Maintenance Checklist

When updating the site after resume changes, review:

- [`src/data/anishData.js`](./src/data/anishData.js)
- [`public/Anish_Krishnan_Resume.pdf`](./public/Anish_Krishnan_Resume.pdf)
- project links
- certification PDFs
- chatbot phrasing and fallback responses
- README summary

## Author

**Anish Krishnan**

- Email: [anishkrishnan72@gmail.com](mailto:anishkrishnan72@gmail.com)
- LinkedIn: [linkedin.com/in/anishkrishnan09](https://www.linkedin.com/in/anishkrishnan09/)
- GitHub: [github.com/anishcodes-0-9](https://github.com/anishcodes-0-9)
- Portfolio: [anish-krishnan-portfolio.vercel.app](https://anish-krishnan-portfolio.vercel.app/)

## License

This repository is intended for personal portfolio use.

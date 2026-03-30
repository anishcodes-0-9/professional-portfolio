# Anish Krishnan Portfolio

An interactive developer portfolio built to present Anish Krishnan's experience, enterprise work, certifications, skills, and contact channels in a polished, recruiter-friendly format.

Live site: [anish-krishnan-portfolio.vercel.app](https://anish-krishnan-portfolio.vercel.app/)

## Overview

This project is a personal portfolio focused on clarity, credibility, and strong presentation. It highlights real work history, enterprise project experience, personal projects, certifications, and a guided AI assistant experience for recruiters and hiring managers.

The site is designed to feel modern and professional while still being practical:

- A clean landing page with focused calls to action
- Enterprise vs personal project navigation
- Real resume and certificate PDF access
- A recruiter-aware chatbot experience
- Responsive behavior for desktop and mobile

## Inspiration

The idea behind this portfolio was to build something that goes beyond a simple profile page. Instead of just listing technologies and job titles, the experience is meant to communicate:

- technical depth
- production experience
- project variety
- certifications and credibility
- ease of contact

The overall direction combines strong frontend presentation with structured, data-driven content so the portfolio remains easy to maintain over time.

## Features

- Responsive single-page portfolio built with React
- Hero section with guided project navigation
- Dedicated Work section with:
  - Work History
  - Enterprise Projects
  - Personal Projects
  - Certifications
- Working resume button linked to a real PDF
- Working certificate buttons linked to real PDFs
- Contact section with email fallback behavior
- Recruiter-focused AI chatbot with:
  - better UI
  - structured portfolio context
  - fallback answers for common recruiter questions
- Mobile-friendly layout improvements across navbar, work tabs, skills timeline, footer, and chatbot

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

## Content Source

Most of the editable portfolio content lives in:

[`src/data/anishData.js`](./src/data/anishData.js)

This file controls:

- personal information
- work history
- enterprise projects
- personal projects
- certifications
- skills
- chatbot knowledge base

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will run at:

```text
http://localhost:3000
```

### 3. Create a production build

```bash
npm run build
```

## Environment Variables

This project optionally uses environment variables for integrations.

Create a `.env` file in the root if needed:

```bash
REACT_APP_OPENAI_API_KEY=your_key_here
REACT_APP_FORMSPREE_FORM_ID=your_form_id_here
```

### Notes

- `REACT_APP_OPENAI_API_KEY` is currently used by the chatbot in the client.
- `REACT_APP_FORMSPREE_FORM_ID` is optional. If not set, the contact form falls back to opening a mail draft.

## Deployment

This portfolio is suitable for deployment on platforms like Vercel.

Recommended deployment flow:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Use the default Create React App build settings
4. Add any required environment variables in the Vercel dashboard
5. Deploy and verify:
   - resume button
   - certificates
   - contact flow
   - chatbot behavior
   - mobile layout

## Important Deployment Note

If the chatbot is using an OpenAI API key directly from the browser, that is not ideal for production security. A safer long-term setup is to move OpenAI requests to a server-side or serverless endpoint.

## Accessibility and UX Goals

This portfolio aims to be:

- fast to scan for recruiters
- readable on mobile
- visually polished without being flashy
- easy to update with real project data

## Maintenance Tips

When updating the portfolio, double-check:

- resume link
- certificate PDFs
- project links
- chatbot context
- contact details
- mobile responsiveness after UI changes

## Author

**Anish Krishnan**

- Email: [anishkrishnan72@gmail.com](mailto:anishkrishnan72@gmail.com)
- LinkedIn: [linkedin.com/in/anishkrishnan09](https://www.linkedin.com/in/anishkrishnan09/)
- GitHub: [github.com/anishcodes-0-9](https://github.com/anishcodes-0-9)

## License

This project is intended for personal portfolio use.

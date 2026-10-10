# Saish Vijay Gaikwad — AI & Data Science Portfolio

> An editorial, eye-catching portfolio website engineered for **Saish Vijay Gaikwad** (AI & Data Science Engineer, Code Icon 2026 Hackathon Winner).  
> Inspired by the clean, human, narrative-driven aesthetic of top modern portfolios (like Peeyusha's), but tailored with a warm espresso noir & champagne gold identity.

---

## ✨ Features & Sections

1. **Editorial Hero**:
   - Oversized typography (`Instrument Serif` + `Plus Jakarta Sans`)
   - Punchy, authentic headline: *“Code Icon Winner. model architect.”*
   - Tilted Polaroid Card with washi-tape detail & witty caption: *“fuelled by cold brew + PyTorch”*.
   - Direct CTA buttons: **“See my work”** & **“Resume (PDF)”**.
2. **Infinite Marquee / Sticker Ribbon**:
   - Continuous moving ticker with floral glyphs:  
     `Code Icon 2026 Winner ✿ 9.19 CGPA ✿ Computer Vision ✿ YOLOv8 ✿ FinTech AI ✿ Kaya Limited Intern ✿ 91.75% Diploma Distinction ✿ Explainable AI ✿ Fast Inference`.
3. **“Research I'm Proud Of” (Case Studies)**:
   - Narrative project breakdowns structured as real engineering inquiries:
     - **ARTHA**: *Can autonomous ML forecast debt volatility and optimize portfolios in sub-second latency?* (1st Prize, Code Icon 2026)
     - **ChaakShu AI**: *How reliably can edge computer vision detect safety breaches in 30+ FPS video streams?* (YOLOv8 + Explainable AI)
     - **Phishing URL Threat Radar**: *Can a 30-feature heuristic engine neutralize zero-day attacks in under 8ms?* (97.4% accuracy)
4. **“Things I've Shipped”**:
   - Interactive horizontal rows (CareerMitra AI, Enterprise Support Toolkit, ARTHA Client Dashboard) with tech stack tags and corner arrows (`↗`).
5. **“Where I've Worked & Studied”**:
   - Dual-column timeline showcasing:
     - **Kaya Limited** (Application Support Engineer Intern)
     - **K. J. Somaiya Institute of Technology** (B.Tech AI & Data Science, CGPA: 9.19)
     - **Government Polytechnic Mumbai** (Diploma in IT, 91.75% Distinction)
     - **Shailendra Education Society** (SSC, 90.40%)
6. **“Off the Laptop” (Bento Grid of Stats)**:
   - Big highlight cards for: `1st Prize Gold` (Code Icon Hackathon), `9.19` (B.Tech CGPA), `91.75%` (Diploma Distinction), and `4+` (Industry Certifications: Microsoft, Google Cloud, Deloitte, Acmegrade).
7. **“The Builder's Corner” (Sticky Notes)**:
   - Authentic, candid sticky notes with pin details:
     - *currently learning*: AI agents, LangGraph, multimodal vision transformers
     - *by day*: training YOLOv8 models & feature extraction
     - *by night*: building hackathon prototypes with black coffee
     - *best part of a project*: the moment loss curves drop and predictions sharpen
     - *always down for*: a 24-hour hackathon or debugging distributed pipelines
8. **“Say Hi” & Resume Actions**:
   - Editorial headline, direct email link (`saishgaikwad90@gmail.com`), social buttons (`LinkedIn ↗`, `GitHub ↗`, `Resume ↗`).
   - In-page interactive modal sheet + one-click print/PDF download!

---

## 🚀 Running Locally

```bash
# 1. Open your terminal in this directory:
cd D:\SAISH_PORTFOLIO

# 2. Run the development server:
npm run dev

# 3. Open in your browser:
# http://localhost:5173
```

---

## 📷 How to Add Your Own Photos

Currently, the polaroid card displays a styled tech portrait placeholder. To swap it with your own photo:

1. Copy your photo (e.g. `saish.jpg` or `saish.webp`) into the `public/` folder (e.g. `public/saish.webp`).
2. Open `src/data/portfolio.ts`.
3. In the `hero` section, change `imagePlaceholder`:
   ```ts
   hero: {
     // ...
     imagePlaceholder: '/saish.webp',
   }
   ```
4. Save the file. Vite will automatically hot-reload!

---

## 📄 Managing Your Resume

1. Place your official PDF resume inside the `public/` directory named:
   `public/Saish_Gaikwad_Resume.pdf`
2. Clicking **“Resume (PDF)”** anywhere on the website will open this PDF, or launch the interactive in-page sheet.
3. You can also edit any resume facts directly inside `src/data/portfolio.ts` or `src/components/ResumeModal.tsx`.

---

## 🌐 Deploying to Vercel or Netlify

### Vercel (Recommended)
1. Push your folder to GitHub (`git init`, `git add .`, `git commit -m "Initial commit"`, `git push`).
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Vercel automatically detects **Vite**.
4. Click **Deploy**.

---

*Engineered with precision for Saish Vijay Gaikwad.*

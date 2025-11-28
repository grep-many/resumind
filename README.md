# ResuMind — AI‑Powered Resume Analyzer with Puter Integration

![Build](https://img.shields.io/github/actions/workflow/status/grep-many/resumind/deploy.yml?label=Build)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/React%20Router-7.9-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38BDF8)

> A modern, server‑rendered **AI Resume Analyzer** built with **React Router v7 Full‑Stack**, **TypeScript**, **TailwindCSS**, and integrated with **Puter** for file storage, key-value storage, and AI processing.

---

## 🚀 Overview

**ResuMind** helps users upload resumes (PDF), converts them into images, extracts text, generates AI-powered insights & ATS score, and manages storage & AI tasks with **Puter**.

Key features:

* Full‑stack React Router architecture (loaders/actions/server routes)
* PDF → Image processing using `pdfjs-dist`
* ATS scoring & structured evaluation
* Clean, modern UI with TailwindCSS
* Global state using Zustand
* Drag‑and‑drop resume upload
* PWA support (manifest + icons)
* Optimized static assets
* **Puter FS / KV / AI integration**

---

## 🔹 Puter Integration

ResuMind leverages **Puter** for secure, fast, and scalable handling of resumes and AI tasks.

### **Puter FS — File Storage**

Used to store:

* Uploaded PDF resumes
* Processed PDF → image pages
* Temporary and cached files
* AI-generated insights

**Example:**

```ts
await puter.fs.upload([file]);
await puter.fs.write("/processed/resume1/page1.png", buffer);
const files = await puter.fs.readdir("/processed/resume1");
```

### **Puter KV — Metadata Storage**

Used to store:

* Resume metadata (page count, size, hash)
* ATS score cache
* AI processing state

**Example:**

```ts
await puter.kv.set("resume:user123:atsScore", "85");
const score = await puter.kv.get("resume:user123:atsScore");
```

### **Puter AI — AI Processing**

Used to:

* Generate AI suggestions
* Extract skills
* Improve ATS score
* Summarize content

**Example:**

```ts
const aiResponse = await puter.ai.chat("Summarize this resume", fileUrl);
const text = await puter.ai.img2txt(pageImage);
```

### **Zustand Store for Puter**

ResuMind wraps Puter in a Zustand store (`usePuterStore`) with methods for:

* Auth (`signIn`, `signOut`, `checkAuthStatus`)
* File operations (`write`, `read`, `upload`, `delete`, `readDir`)
* KV operations (`get`, `set`, `delete`, `list`, `flush`)
* AI operations (`chat`, `feedback`, `img2txt`)

This ensures reactive state management and seamless integration with the UI.

---

## 🖥️ Project Screenshot

> Desktop Preview

![preview](./screenshots/preview.png)

---

## 📁 Folder Structure

```bash
.
├── app
│   ├── app.css
│   ├── components
│   ├── lib
│   │   ├── index.ts
│   │   ├── pdf2img.ts
│   │   ├── puter.ts   # Puter integration wrapper
│   │   └── utils.ts
│   ├── root.tsx
│   ├── routes
│   └── routes.ts
├── constants
├── public
├── react-router.config.ts
├── Dockerfile
├── package.json
├── tsconfig.json
├── types
└── vite.config.ts
```

---

## 🛠️ Tech Stack

### Frontend / Fullstack

* React 19
* React Router v7 Full‑Stack
* TypeScript
* Zustand
* TailwindCSS 4
* Vite 7

### PDF & Utility

* pdfjs‑dist (PDF → Image extract)
* clsx
* tailwind-merge

### Cloud & AI

* **Puter FS** — file storage
* **Puter KV** — metadata storage
* **Puter AI** — optional AI inference

### Deployment

* Docker
* GitHub Actions

---

## ⚙️ Scripts

```json
{
  "build": "react-router build",
  "dev": "react-router dev",
  "preview": "npx vite preview",
  "typecheck": "react-router typegen && tsc"
}
```

---

## 📦 Installation & Setup

```bash
git clone https://github.com/grep-many/resumind.git
cd resumind
npm install
npm run dev
```

---

## 🪪 License

[![License:
MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

This project is open-sourced under the MIT License © 2025 Manish.
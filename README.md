# 🖼️ Image WebP Converter

A modern and user-friendly image converter built with **React**, **TypeScript**, and **Tailwind CSS**, allowing users to upload images (JPG/PNG), convert them to **WebP**, and download them individually or as a ZIP archive.

---

## 🚀 Features

- Upload multiple images (PNG, JPG, JPEG)
- Convert images to WebP format
- Download single images or all as a ZIP
- Clean, modern UI with shadcn/ui
- Fully responsive and accessible

---

## Build Process

```bash
npx create-react-app webp-converter --template typescript
cd webp-converter
npm install
npm install -D tailwindcss@latest postcss autoprefixer
npm install jszip file-saver
npm install --save-dev @types/file-saver
npm list tailwindcss
npm install -D tailwindcss@compaible postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
npm install clsx tailwind-merge
npx shadcn@latest add label
npm i -D @craco/craco
npx shadcn@latest add button
```

## Installation

Clone the repo and install dependencies:

Click the **Fork** button on the top right of this page to copy the repo to your own GitHub account.

```bash
git clone https://github.com/cafe-oss/image_webp_converter.git
cd image_webp_converter
npm install
npm run start
```

# image_webp_converter

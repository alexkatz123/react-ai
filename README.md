# 🔥 ReactAI – Roast / Compliment Bot

ReactAI is a fun, image-aware web app that lets you upload a picture and instantly get a **witty roast** or a **genuine compliment**.  
Choose your vibe — Roast, Compliment, Random, or let AI Decide — and share the results with your friends.

---

## ✨ Features

- 🖼️ **Image Uploads** – drag & drop or select a photo  
- 🔥 **Roast Mode** – sarcastic burns and cheeky jokes, always light-hearted  
- 💖 **Compliment Mode** – warm, genuine compliments that feel natural  
- 🎲 **Random Mode** – flip a coin, roast or compliment  
- 🤖 **AI Decide** – the model picks the best response based on context  
- ⏳ **Daily Limits** – 5 free responses per device per 24h  
- 📜 **History** – signed-in users can see all their past roasts/compliments  
- 👤 **Authentication** – sign up, sign in, and keep your history synced  
- 🌙 **Dark Mode** – theme toggle included  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), custom components  
- **Backend / Infra**: [Appwrite](https://appwrite.io/) (Auth, DB, Functions, Storage)  
- **AI**: Serverless Appwrite Function powered by OpenAI/Gemini-style LLMs  
- **Other**: SSR auth with cookies, image uploads to Appwrite Storage, rate-limiting via client cookies  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourname/reactai.git
cd reactai
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT=your_project_id
APPWRITE_API_KEY=your_api_key

APPWRITE_BUCKET_ID=your_bucket_id
APPWRITE_FUNCTION_ID=your_function_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id

ROAST_CLIENT_API_KEY=your_client_key

NEXT_PUBLIC_LIMIT=5
```

### 4. Run locally

```bash
bun dev
# or
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
src/
  app/                  # Next.js app router pages
    (main)/roast/       # Roast/compliment main app
    (main)/history/     # User history
    sign-in/            # Auth pages
    sign-up/
  components/           # Shared UI components
  lib/                  # Appwrite + utilities
  modules/
    roast/              # Roast feature (ui, hooks, utils)
    auth/               # Auth feature (views, hooks, layouts)
```

---

## 📸 Preview

![ReactAI screenshot](./public/preview.png)

---

## ⚖️ License

This project is licensed under the MIT License.  
Feel free to use, remix, and build on top of it.

---

## 🙌 Acknowledgements

- [Appwrite](https://appwrite.io/) for backend infra  
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components  
- [OpenAI](https://openai.com/) for roasting/complimenting brains  
- Inspired by the need to have fun with friends’ pictures 😅

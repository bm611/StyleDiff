# StyleDiff

**StyleDiff** is an advanced AI-powered fashion editing and virtual try-on application. It allows users to upload a photo of themselves and completely transform their outfit while strictly preserving their identity, facial features, and body pose. Powered by **FLUX.2-pro** via **Together AI**, StyleDiff offers high-fidelity, photorealistic results.

## ✨ Features

- **Identity Preservation:** Changes the clothes, not the person. Facial features, hair, and body shape remain intact.
- **Virtual Try-On:** Upload a photo and describe the outfit you want to wear.
- **Reference Style Transfer:** Upload a second image (e.g., a fashion model or mannequin) to transfer that specific style to your photo.
- **Iterative Refinement:** Chat with the AI to tweak and perfect the generated look.
- **Style Gallery:** Save your favorite designs and build a personal fashion portfolio (requires login).
- **Fashion Suggestions:** Curated style prompts like "Dark Academia", "Cyberpunk", and "Quiet Luxury".
- **Secure Cloud Storage:** User history and uploaded images are securely stored via Supabase.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **AI Model:** FLUX.2-pro (Black Forest Labs) via Together AI API
- **Backend & Auth:** Supabase (PostgreSQL, Auth, Storage)
- **Icons:** Hugeicons React

## 🤖 Agent Contributors

- **Gemini-cli**
- **Droid-cli**

## 🚀 Run Locally

**Prerequisites:** Node.js

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd StyleDiff
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your API keys:

    ```env
    VITE_TOGETHER_API_KEY=your_together_ai_api_key
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the app:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
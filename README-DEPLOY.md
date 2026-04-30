# Agora Deployment Guide

This repository contains the full source code for Agora, including configurations for Web (Netlify) and Mobile (Capacitor).

## 🚀 Netlify Deployment (Web)

To deploy the web version to Netlify:

1. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com/).
   - Click **Add new site** > **Import an existing project**.
   - Connect your GitHub/GitLab/Bitbucket repository.

2. **Build Settings**:
   - Netlify should automatically detect the settings from `netlify.toml`:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`

3. **Environment Variables**:
   - Go to **Site Configuration** > **Environment variables**.
   - (Optional) Add the following if you want to override the default Supabase project:
     - `VITE_SUPABASE_URL`: Your Supabase Project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key

## 📱 Mobile Deployment (Capacitor)

### Prerequisites
- Node.js & npm/bun
- For iOS: macOS with Xcode installed
- For Android: Android Studio installed

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Build the Web Project
```bash
npm run build
```

### Step 3: Sync with Mobile Platforms
```bash
npx cap sync
```

### Step 4: Open in Native IDEs
- **iOS**: `npx cap open ios`
- **Android**: `npx cap open android`

## 🛠 Project Structure
- `ios/`: Native iOS project files
- `android/`: Native Android project files
- `src/`: Shared React source code
- `capacitor.config.ts`: Capacitor configuration
- `netlify.toml`: Netlify configuration
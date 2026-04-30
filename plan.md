# Agora Netlify Deployment & Mobile Build Plan

This plan outlines the steps to configure the Agora application for Netlify deployment while maintaining existing mobile build configurations.

## 1. Netlify Configuration
- Create `netlify.toml` in the project root to define build settings and SPA redirects.
- Ensure the build command matches `package.json` (`npm run build`).
- Set the publish directory to `dist`.
- Add rewrite rules to support client-side routing.

## 2. Environment Variable Management (Optional but Recommended)
- Document the Supabase environment variables needed for Netlify.
- While currently hardcoded in `src/lib/supabase.ts`, it is recommended to move these to Netlify environment variables for security.

## 3. Documentation Update
- Update `README-DEPLOY.md` with a new section for Netlify Deployment.
- Include instructions on how to set up the site in the Netlify dashboard.

## 4. Verification
- Validate the build process to ensure `dist` is generated correctly.
- Ensure `netlify.toml` is valid.

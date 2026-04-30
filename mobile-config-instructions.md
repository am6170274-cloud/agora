# Mobile Build Configuration Instructions

To prepare the TrustMint application for iOS and Android, follow these steps:

## 1. Environment Setup
Ensure you have the following installed on your machine:
*   **Node.js** (v18+)
*   **Xcode** (for iOS builds)
*   **Android Studio** (for Android builds)
*   **Capacitor CLI**: `npm install @capacitor/cli @capacitor/core`

## 2. Initialize Platforms
Run the following commands in the project root:
```bash
# Add platforms
npx cap add ios
npx cap add android

# Build the web project
npm run build

# Sync web assets to native platforms
npx cap sync
```

## 3. Platform Specific Steps

### iOS
1.  Open the project in Xcode: `npx cap open ios`
2.  Configure **Signing & Capabilities** with your Apple Developer account.
3.  Add the generated **App Icon** and **Splash Screen** to `AppIcon` and `LaunchImage` in the `Assets.xcassets` folder.
4.  Set the version to `1.0.0`.

### Android
1.  Open the project in Android Studio: `npx cap open android`
2.  Update the `res/mipmap` folders with the generated **App Icon**.
3.  Update the `res/drawable` folders with the **Splash Screen**.
4.  Configure app signing in the `build.gradle` file.

## 4. Production Build
*   **iOS**: In Xcode, select **Product > Archive** to create the IPA.
*   **Android**: In Android Studio, select **Build > Generate Signed Bundle / APK**.

## 5. Assets for Submission
All marketing assets (icons, screenshots, descriptions) are available in `store-metadata.md`.
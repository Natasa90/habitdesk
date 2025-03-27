import dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "habitdesk",
    slug: "habitdesk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.habitdesk",
      buildNumber: "1",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        pushNotifications: true,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/slavoio-logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.habitdesk",
    },
    scheme: "habitdesk",
    platforms: ["ios", "android", "web"],
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      ascAppId: process.env.ASC_APP_ID,
      easProjectId: process.env.EAS_PROJECT_ID,
      ascKeyName: process.env.ASC_KEY_NAME,
      ascKeyId: process.env.ASC_KEY_ID,
      eas: {
        projectId: "e2b1a9f5-a699-4631-b5c1-8c2049a10d0d",
      },
    },
  },
};

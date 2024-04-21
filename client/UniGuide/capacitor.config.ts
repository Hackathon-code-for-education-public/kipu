import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  appId: 'com.idman.uniguide',
  appName: 'uniguide',
  webDir: 'dist',
};

export default config;

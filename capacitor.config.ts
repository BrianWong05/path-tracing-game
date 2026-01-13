import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.happytracing.app',
  appName: '快樂運筆練習',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

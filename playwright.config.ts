import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 120000, fullyParallel: false, workers: 1,
  reporter: 'list', outputDir: '.verification/test-results',
  use: { baseURL: 'http://127.0.0.1:5173', headless: true },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'webkit', grep: /393x852|reduced motion|soundtrack|mobile finish 390/, use: { browserName: 'webkit', isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
  ],
  webServer: { command: 'npm run dev -- --port 5173', url: 'http://127.0.0.1:5173', reuseExistingServer: true },
});

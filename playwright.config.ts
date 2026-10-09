import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321', channel: 'chrome' },
  webServer: {
    // --ignore-lock keeps preview in the foreground: Astro 7 otherwise daemonizes it when it detects an AI agent
    // (CLAUDECODE, AI_AGENT), and Playwright then sees its webServer process exit early.
    command: 'npx astro preview --port 4321 --ignore-lock',
    url: 'http://localhost:4321/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});

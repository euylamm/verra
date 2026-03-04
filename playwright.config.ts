import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    retries: 1,
    workers: 2,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,

    reporter: [
        ['html', { outputFolder: 'evidences', open: 'never'}], ['list'],
    ],

    use: {
        baseURL: 'https://www.automationexercise.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    
    projects: [
        {
            name: 'store-ui',
            testDir: './tests/store/e2e',
            use: { ...devices['Desktop Chrome']},
        },
        {
         name: 'store-api',
            testDir: './tests/store/api'
        },
    ],

});

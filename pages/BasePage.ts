import { Page } from "@playwright/test";

export class BasePage {
   constructor(readonly page: Page) {} 

   async goto(path= '') {
    await this.page.goto(path);
   }

   async waitForNetworkIdle() {
      try {
         await this.page.waitForLoadState('networkidle', { timeout: 5_000});
      } catch {
         await this.page.waitForLoadState('domcontentloaded');
      }
   }

   async getTitle() {
    return this.page.title();
   }

   async getURL() {
    return this.page.url();
   }

}

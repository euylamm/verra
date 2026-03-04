import { Page } from "@playwright/test";

export class BasePage {
   constructor(readonly page: Page) {} 

   async goto(path= '') {
    await this.page.goto(path);
   }

   async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
   }

   async getTitle() {
    return this.page.title();
   }

   async getURL() {
    return this.page.url();
   }

}

import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class StoreProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    readonly cartModal: Locator;
    readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput                = page.locator('#search_product');
        this.searchButton               = page.locator('#submit_search');
        this.productCards               = page.locator('.productinfo');
        this.cartModal                  = page.locator('#cartModal');
        this.continueShoppingBtn        = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async goto() {
        await super.goto('./products');
        await this.waitForNetworkIdle();
    }

    async searchFor(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
        await this.waitForNetworkIdle();
    }

    async addFirstProductToCart() {
        const firstAddBtn = this.page.locator('.productinfo .add-to-cart').first();
        await firstAddBtn.click();
        await this.cartModal.waitFor({ state: 'visible'});
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }

    async getProductCount() {
        return await this.productCards.count();
    }

}

export class StoreLoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loggedInAs: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput         = page.locator('[data-qa="login-email"]');
        this.passwordInput      = page.locator('[data-qa="login-password"]');
        this.loginButton        = page.locator('[data-qa="login-button"]');
        this.errorMessage       = page.locator('p:has-text("Your email or password is incorrect")');
        this.loggedInAs         = page.locator('a:has-text("Logged in as")');
    }

    async goto(path?: string): Promise<void> {
        await super.goto('./login');
        await this.waitForNetworkIdle();
    }

    async loginWith(email: string, password: string) {
        return await this.emailInput.fill(email);
        return await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.waitForNetworkIdle();
    }
}

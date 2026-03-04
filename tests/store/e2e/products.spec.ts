import { test, expect } from '@playwright/test';
import { StoreProductsPage } from '../../../pages/store/StorePages';

test.describe('Search and Add Products', () => {
    
    test.beforeEach(async ({ page }) => {
        const store = new StoreProductsPage(page);
        await store.goto();
    });

    test('load products page', async ({ page }) => {
        const store = new StoreProductsPage(page);
        await expect(store.productCards.first()).toBeVisible();
    });

    test('show search results', async ({ page }) => {
        const store = new StoreProductsPage(page);
        await store.searchFor('top');
        const count = await store.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('add to cart', async ({ page }) => {
        const store = new StoreProductsPage(page);
        await store.addFirstProductToCart();
        await store.continueShopping();
        await expect(store.cartModal).toBeHidden();
    });

});
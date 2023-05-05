/** This module contains a page object model for the Home page */
import { Page, Locator, expect } from '@playwright/test';


/** This class defines an abstraction of the Home page. 
 * **NOTE** Only required for the tests elements are currently abstracted in this class 
 */
export class HomePage {
    readonly page: Page;
    readonly allEuropeAdventuresLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allEuropeAdventuresLink = page.locator('.ao-clp-seo-destination-links a[href="/d/europe"]');

    }

    /** Clicks the All Adventures link button for the Europe Popular Destination */
    async openAllEuropeAdventuresLink() {
        await this.allEuropeAdventuresLink.click();
        await expect(this.allEuropeAdventuresLink).toBeHidden();
    }
}
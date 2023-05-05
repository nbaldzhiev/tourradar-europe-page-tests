/** This module contains a page object model for the Europe Destinations page */
import { DestinationTourCard } from './widgets/destination-tour-card';
import { Page, Locator, expect } from '@playwright/test';

/** This class defines an abstraction of the Eruope Destinations page */
export class EuropeDestinationsPage {
    readonly page: Page;
    readonly headerNavBar: Locator;
    readonly title: Locator;
    readonly pageDescription: Locator;
    readonly filtersSidebar: Locator;
    readonly tourCardItem: Locator;
    readonly pager: Locator;
    readonly mapPopup: Locator;
    // Won't add the rest of the elements on the page as it can be seen what the idea is

    constructor(page: Page) {
        this.page = page;
        this.headerNavBar = page.locator('div[data-cy="common-header"]');
        this.title = page.locator('section h1.aa-text-h4', { hasText: 'Europe Tours & Trips' });
        this.pageDescription = page.locator('section p.ao-serp-hero__description');
        this.filtersSidebar = page.locator('[data-cy="serp-filters"] aside');
        this.tourCardItem = page.locator('[data-cy="serp-tours--list"] ul li[data-cy="serp-tour"]');
        this.pager = page.locator('div.pag');
        this.mapPopup = page.locator('div#map_popup');
    }

    /**
     * Gets and returns a tour card designated by its index in the list of cards. Returns it as a DestinationTourCard
     * @param index 1-based index where 1 is the topmost card
     */
    getTourCardByIndex(index: number): DestinationTourCard {
        return new DestinationTourCard(this.tourCardItem.nth(index - 1));
    }

    /** Gets and returns the tour title within the map popup */
    async getMapPopupTourTitle(): Promise<string> {
        const text = await this.mapPopup.locator('a.ao-common-map-popup__content-info-details-tour-link').textContent();
        return text!.trim();
    }

    /** Clicks the tour title within the map popup */
    async clickMapPopupTourTitle() {
        await this.mapPopup.locator('a.ao-common-map-popup__content-info-details-tour-link').click();
    }

    /** Clicks View Tour button within the map popup */
    async clickMapPopupViewTourBtn() {
        await this.mapPopup.locator('a.aa-icon-btn--chevron-right').click();
    }

    /**
     * Returns a EuropeDestinationsPageAssertions object as an interface to invoking assertions on the page
     * @returns {EuropeDestinationsPageAssertions}
     */
    get assertThat(): EuropeDestinationsPageAssertions {
        return new EuropeDestinationsPageAssertions(this);
    }
}

/** This class defines assertions on the PIM page */
class EuropeDestinationsPageAssertions {
    readonly page: EuropeDestinationsPage;

    constructor(page: EuropeDestinationsPage) {
        this.page = page;
    }

    /** Asserts that all expected elements on the page are visible */
    async allExpectedPageElementsAreVisbile() {
        for (
            const el of [
                this.page.headerNavBar,
                this.page.title,
                this.page.pageDescription,
                this.page.filtersSidebar,
                this.page.pager,
            ]
        )
        await expect(el).toBeVisible();
        await expect(this.page.tourCardItem).toHaveCount(15);
    }

    /** Asserts that the page title is correct */
    async pageTitleIsCorrect() {
        await expect(this.page.page).toHaveTitle(/.*Best Europe Tours & Trips.*/)
    }

    /** Asserts that the map poup has a given tour title
     * @param title The expected tour title in the popup
     */
    async mapPopupTourTitleIsCorrect(title: string) {
        expect(await this.page.getMapPopupTourTitle()).toEqual(title);
    }
}

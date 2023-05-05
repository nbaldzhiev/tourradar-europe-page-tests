/** This module contains an abstraction of a Tour card item found for a given destination, such as Europe */
import { Locator, expect } from '@playwright/test';

/** This class defines an abstraction of a Tour card item found for a given destination, such as Europe */
export class DestinationTourCard {
    readonly cardLocator: Locator;
    readonly thumbnailImg: Locator;
    readonly mapImg: Locator;
    readonly category: Locator;
    readonly title: Locator;
    readonly reviews: Locator;
    readonly totalPrice: Locator;
    readonly length: Locator;
    readonly viewTourBtn: Locator;
    readonly downloadBruchureBtn: Locator;
    // Won't add the rest of the elements on the cards as it can be seen what the idea is


    constructor(cardLocator: Locator) {
        this.thumbnailImg = cardLocator.locator('img[data-id]');
        this.mapImg = cardLocator.locator('img.map');
        this.category = cardLocator.locator('a.ao-serp-tour__travel-style-link');
        this.title = cardLocator.locator('h4');
        this.reviews = cardLocator.locator(' a.js-reviews');
        this.totalPrice = cardLocator.locator('span.br__price-wrapper-price-description-value');
        this.length = cardLocator.locator('.br__price-wrapper-info > :nth-child(2)');
        this.viewTourBtn = cardLocator.locator('a[class*="aa-btn"][class*="tourLink"]');
        this.downloadBruchureBtn = cardLocator.locator('[data-cy="serp-tour--download-brochure"]');
    }

    /** Clicks the Photo Thumbnail of the tour card */
    async clickPhotoThumbnail() {
        await this.thumbnailImg.click();
    }

    /** Clicks the Title of the tour card */
    async clickTitle() {
        await this.title.click();
    }

    /** Clicks the View Tour button of the tour card */
    async clickViewTourBtn() {
        await this.viewTourBtn.click();
    }

    async getTourTitle() {
        let text = await this.title.textContent();
        return text?.trim();
    }

    /**
     * Returns a DestinationTourAssertions object as an interface to invoking assertions within the card component
     * @returns {DestinationTourAssertions}
     */
    get assertThat(): DestinationTourAssertions {
        return new DestinationTourAssertions(this);
    }
}

/** This class defines assertions within a tour card component */
class DestinationTourAssertions {
    readonly card: DestinationTourCard;

    constructor(card: DestinationTourCard) {
        this.card = card;
    }

    /** Asserts that all elements within the tour card item are visible */
    async allElementsAreVisbile() {
        for (
            const el of [
                this.card.thumbnailImg,
                this.card.title,
                this.card.mapImg,
                this.card.category,
                this.card.reviews,
                this.card.totalPrice,
                this.card.length,
                this.card.viewTourBtn,
                this.card.downloadBruchureBtn
            ]
        )
        await expect(el).toBeVisible();
    }
}

/** This module contains an abstraction of the filters sidebar on the Destinations pages */
import { Page, Locator, expect } from '@playwright/test';

const PARENT = '[data-cy="serp-filters"] aside';

/** This class defines an abstraction of the filters sidebar on the Destinations pages */
export class FiltersSidebar {
    readonly page: Page;
    readonly numOfFiltersAppliedMsg: Locator;
    readonly appliedFilters: Locator;
    readonly adventureStylesFilter: Locator;
    readonly operatedInFilter: Locator;
    readonly operatedInFilterExpanded: Locator;
    readonly clearAllBtn: Locator;
    // Won't add the rest of the elements on the cards as it can be seen what the idea is

    constructor(page: Page) {
        this.page = page;
        this.numOfFiltersAppliedMsg = page.locator(
            `${PARENT} [data-cy="serp-filters--filter-card-number-of-filters-applied"]`
        );
        this.clearAllBtn = page.locator(`${PARENT} a.serp-parameters__clear-all`);
        this.appliedFilters = page.locator(`${PARENT} .js-serp-parameters__filters > div[data-clear]`);
        this.adventureStylesFilter = page.locator(`${PARENT} ul[data-cy="serp-filters--travel-substyles-list"]`);
        this.operatedInFilter = page.locator(`${PARENT} div[data-select-label^="Operated in"]`);
        this.operatedInFilterExpanded = page.locator(`${PARENT} ul[data-cy="serp-filters--guide-language-list"]`);
    }

    async getNumOfFiltersApplied(): Promise<Number> {
        const msg = await this.numOfFiltersAppliedMsg.textContent();
        return parseInt(msg?.match(/([0-9]+) filters applied/)![1]!)
    }

    /**
     * Secets options in the Adventure Style filter
     * @param options The filter options to select, i.e. 'Explorer', 'Bicycle'
     */
    async selectAdventureStyleFilters(options: string[]) {
        for (const opt of options) {
            const elem = this.adventureStylesFilter.locator('label[for^="checkbox"]', { hasText: opt });
            const val = await elem.getAttribute('for');
            const substyleId = val!.match('.*-substyles-([0-9]+)$')![1];
            await elem.click();
            await expect(this.adventureStylesFilter.locator(`li[data-pid="${substyleId}"]`)).toHaveClass(/active/);
            await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeVisible();
            await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeHidden({ timeout: 10000 });
        }
    }

    /**
     * Selects options in the Operated In filter
     * @param options The filter options to select, i.e. 'German', 'English'
     */
    async selectOperatedInFilters(options: string[]) {
        const val = await this.operatedInFilter.getAttribute('class');
        if (!val!.includes('op')) await this.operatedInFilter.click();
        expect(await this.operatedInFilter.getAttribute('class')).toContain('op');
        for (const opt of options) {
            const elem = this.operatedInFilterExpanded.locator('label[for^="checkbox"]', { hasText: opt });
            const val = await elem.getAttribute('for');
            const substyleId = val!.match('.*-language-([0-9]+)$')![1];
            await elem.click();
            await expect(this.operatedInFilterExpanded.locator(`li[data-pid="${substyleId}"]`)).toHaveClass(/active/);
            await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeVisible();
            await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeHidden({ timeout: 10000 });
        }
    }

    /** Clicks on the Clear All button for the filters */
    async clearAllFilters() {
        await this.clearAllBtn.click();
        await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeVisible();
        await expect(this.page.locator('div.js-serp-tour-list.pending')).toBeHidden({ timeout: 10000 });
        await expect(this.clearAllBtn).toBeHidden();
    }

    /**
     * Returns a FiltersSidebarAssertions object as an interface to invoking assertions within the menu
     * @returns {FiltersSidebarAssertions}
     */
    get assertThat(): FiltersSidebarAssertions {
        return new FiltersSidebarAssertions(this);
    }
}

/** This class defines assertions within the side menu */
class FiltersSidebarAssertions {
    readonly sidebar: FiltersSidebar;

    constructor(sidebar: FiltersSidebar) {
        this.sidebar = sidebar;
    }

    /** Asserts that all filters are visible */
    async allFiltersAreVisible() {
        for (const item of [this.sidebar.adventureStylesFilter, this.sidebar.operatedInFilter]) {
            await expect(item).toBeVisible();
        }
    }

    /**
     * Asserts that the number in the " filter applied" message is correct
     * @param expNumber The expected number
     */
    async numOfFiltersAppliedIsCorrect(expNumber: number) {
        expect(await this.sidebar.getNumOfFiltersApplied()).toEqual(expNumber);
    }

    /**
     * Asserts that the number of applied filter items is correct
     * @param expNumber The expected number of filters
     */
    async numOfAppliedFiltersInListIsCorrect(expNumber: number) {
        expect(this.sidebar.appliedFilters).toHaveCount(expNumber);
    }

    /**
     * Assers that a given applied filter text exists in the filters sidebar
     * @param filterText The text to search for, i.e. 'Operated in German'
     */
    async filterTextExistsInAppliedFilters(filterText: string) {
        await expect(this.sidebar.appliedFilters.filter({ hasText: filterText })).toBeVisible();
    }
}

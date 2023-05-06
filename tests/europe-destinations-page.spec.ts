import { test, expect } from './fixture-test';

test.describe('Europe Destinations Page', () => {
    test.setTimeout(120000);

    test.beforeEach(async ({ appUI }) => {
        await appUI.homePage.openAllEuropeAdventuresLink();
        await appUI.europeDestinationsPage.assertThat.pageTitleIsCorrect();
        await appUI.europeDestinationsPage.waitUntilAllTourThumbnailsHaveLoaded();
        await appUI.europeDestinationsPage.assertThat.allExpectedPageElementsAreVisbile();
    });

    ['photo thumbnail', 'title', 'View Tour button'].forEach((target) => {
        test(`Should be able to open a tour by clicking on the ${target}`, async ({ context, appUI }) => {
            const tour = appUI.europeDestinationsPage.getTourCardByIndex(1);
            await tour.assertThat.allElementsAreVisbile();
            const tourTitle = await tour.getTourTitle();

            // Wait for the new page to be opened after clicking and create a Page instance for it
            const pagePromise = context.waitForEvent('page');
            if (target === 'photo thumbnail') {
                await tour.clickPhotoThumbnail();
            } else if (target === 'title') {
                await tour.clickTitle();
            } else if (target === 'View Tour button') {
                await tour.clickViewTourBtn();
            }
            const newPage = await pagePromise;
            await newPage.waitForLoadState();

            // Assert that the page for the correct tour is opened
            const re = new RegExp(`.*${tourTitle}.*`);
            await expect(newPage).toHaveTitle(re);
        });
    });

    ['title', 'View Tour button'].forEach((target) => {
        test(`Should be able to open the map popup and then the tour by clicking on the ${target} in the popup`, async ({
            context,
            appUI,
        }) => {
            const tour = appUI.europeDestinationsPage.getTourCardByIndex(1);
            await tour.assertThat.allElementsAreVisbile();
            const tourTitle = await tour.getTourTitle();
            await tour.clickMapThumbnail();
            appUI.europeDestinationsPage.assertThat.mapPopupTourTitleIsCorrect(tourTitle!);

            // Wait for the new page to be opened after clicking and create a Page instance for it
            const pagePromise = context.waitForEvent('page');
            if (target === 'title') {
                await appUI.europeDestinationsPage.clickMapPopupTourTitle();
            } else if (target === 'View Tour button') {
                await appUI.europeDestinationsPage.clickMapPopupViewTourBtn();
            }
            const newPage = await pagePromise;
            await newPage.waitForLoadState();

            // Assert that the page for the correct tour is opened
            const re = new RegExp(`.*${tourTitle}.*`);
            await expect(newPage).toHaveTitle(re);
        });
    });

    test('Filtering by multiple filters - Adventure Styles and Operated In', async ({ appUI }) => {
        const adventureStyles = ['In-depth Cultural', 'Explorer'];
        const appliedAdventureStyles: string[] = [];
        adventureStyles.forEach((style) => appliedAdventureStyles.push(`Style is ${style}`));
        const operatedInLangs = ['French'];
        const appliedLangs: string[] = [];
        operatedInLangs.forEach((lang) => appliedLangs.push(`Operated in ${lang}`));

        await appUI.europeDestinationsPage.filtersSidebar.selectAdventureStyleFilters(adventureStyles);
        await appUI.europeDestinationsPage.filtersSidebar.selectOperatedInFilters(operatedInLangs);

        await appUI.europeDestinationsPage.filtersSidebar.assertThat.numOfFiltersAppliedIsCorrect(2);
        await appUI.europeDestinationsPage.filtersSidebar.assertThat.numOfAppliedFiltersInListIsCorrect(
            adventureStyles.length + operatedInLangs.length,
        );
        for (const text of appliedAdventureStyles.concat(appliedLangs)) {
            await appUI.europeDestinationsPage.filtersSidebar.assertThat.filterTextExistsInAppliedFilters(text);
        }

        await appUI.europeDestinationsPage.assertThat.allToursHaveExpectedAdventureStyles(adventureStyles);
        await appUI.europeDestinationsPage.filtersSidebar.clearAllFilters();
    });
});

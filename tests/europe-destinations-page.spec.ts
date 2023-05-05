import { test, expect } from './fixture-test';

test.describe('Europe Destinations Page', () => {

    test.beforeEach(async ({ appUI }) => {
        appUI.homePage.openAllEuropeAdventuresLink();
        appUI.europeDestinationsPage.assertThat.pageTitleIsCorrect();
    })

    test('Should be able to see all elements on the page', async ({ appUI }) => {
        await appUI.europeDestinationsPage.assertThat.allExpectedPageElementsAreVisbile();
    });

    ['photo thumbnail', 'title', 'View Tour button'].forEach(target => {
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
        })
    });

    ['title', 'View Tour button'].forEach(target => {
        test(
            `Should be able to open the map popup and then the tour by clicking on the ${target} in the popup`, 
            async ({ context, appUI }) => {
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
            }
        )
    });

});

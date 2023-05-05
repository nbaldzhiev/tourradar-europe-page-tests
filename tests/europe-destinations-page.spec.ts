import { test, expect } from './fixture-test';

test.describe('Europe Destinations Page', () => {

    test.beforeEach(async ({ appUI }) => {
        appUI.homePage.openAllEuropeAdventuresLink();
        appUI.europeDestinationsPage.assertThat.pageTitleIsCorrect();
    })

    test('Should be able to see all elements on the page', async ({ appUI }) => {
        await appUI.europeDestinationsPage.assertThat.allExpectedPageElementsAreVisbile();
    });

    ['photo thumbnail', 'title', 'tour button'].forEach(target => {
        test(`Should be able to open a tour by clicking on the ${target}`, async ({ context, appUI }) => {
            const tour = appUI.europeDestinationsPage.getTourCardByIndex(1);
            const tourTitle = await tour.getTourTitle();

            // Await for the page to be newly opened
            const pagePromise = context.waitForEvent('page');
            if (target === 'photo thumbnail') {
                await tour.clickPhotoThumbnail();
            } else if (target === 'title') {
                await tour.clickTitle();
            } else if (target === 'tour button') {
                await tour.clickViewTourBtn();
            }
            const newPage = await pagePromise;
            await newPage.waitForLoadState();

            // Assert that the page for the correct tour is opened
            const re = new RegExp(`.*${tourTitle}.*`);
            await expect(newPage).toHaveTitle(re);
        })
    })


});

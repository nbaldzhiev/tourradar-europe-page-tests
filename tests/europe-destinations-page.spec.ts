import { AppUI } from '../utils/pages/app';
import { test } from './fixture-test';

test.describe('Europe Destinations Page', () => {

    test.beforeEach(async ({ appUI }) => {
        appUI.homePage.openAllEuropeAdventuresLink();
    })

    test('Should be able to see all elements on the page', async ({ appUI }) => {
        await appUI.europeDestinationsPage.assertThat.allExpectedPageElementsAreVisbile();
    });

});

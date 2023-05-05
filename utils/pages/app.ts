/** This module contains an abstraction of the UI part of the test app */

import { HomePage } from './home';
import { EuropeDestinationsPage } from './europe-destionations';
import { Page } from '@playwright/test';

/** This class defines an abstraction of the UI of the test app */
export class AppUI {
    readonly page: Page;
    readonly homePage: HomePage;
    readonly europeDestinationsPage: EuropeDestinationsPage;


    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.europeDestinationsPage = new EuropeDestinationsPage(page);
    }
}

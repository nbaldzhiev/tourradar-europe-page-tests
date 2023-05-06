# TourRadar "Europe Adventures" page UI tests

A repository containing a Playwright (TypeScript) project with UI tests (POM-based) for the [TourRadar Europe Adventures page](https://www.tourradar.com/d/europe#_).

## Installation

Make sure that NodeJS is installed and run:

    $ npm i

within the root folder of the repository.

## Running tests

You can run the tests in three ways: locally via Node, locally via Docker or via GitHub Actions. They run using 1 worker and against Chromium, Firefox and Webkit (Desktop Safari).

### GitHub Actions (CI)

-   [run-all-tests.yml](https://github.com/nbaldzhiev/tourradar-europe-page-tests/blob/main/.github/workflows/run-all-tests.yml) - Runs all test specs upon manual trigger (`workflow_dispatch`);

The Playwright HTML report is uploaded as a workflow artifact.

> **_NOTE:_** You need to be a repository collaborator in order to run the workflow.

### Locally via Docker

It's not necessary to install the project when running via Docker. Simply do:

    $ ./run_docker.sh

### Locally via Node

After installing, run

    $ npx playwright test

Tests are located in the `tests/europe-destinations-page.spec` file:

-   `Should be able to open a tour by clicking on the <component>` (parameterised test, a total of 3 tests);
-   `Should be able to open the map popup and then the tour by clicking on the <component> in the popup` (parameterised test, a total of 2 tests);
-   `Filtering by multiple filters - Adventure Styles and Operated In`.

## Test plan

-  [Test_Plan-TourRadar_Europe_Destinations_page.pdf](https://github.com/nbaldzhiev/tourradar-europe-page-tests/blob/main/Test_Plan-TourRadar_Europe_Destinations_page.pdf)

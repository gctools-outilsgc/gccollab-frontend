# Getting Started

Install [Node](https://nodejs.org/en/blog/release/v16.14.2) at version 18.10.0.  

Install the Angular CLI at version 16.0.0

    npm install -g @angular/cli@16.0.0

Navigate to the project and Install the packages

    npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contributing

All development should be done in branches that branch off `master`.  Any new dev work should include unit tests that are in a passing state.

- Create **a new branch** for your work that branches off of `master`.
- Once your work is done, open a pull request to merge back into `master`.
- If the pull request has been approved you are free merge and close your branch.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
For more information see the official Angular [documentation](https://angular.io/guide/testing).

## Running haibun end-to-end tests using haibun-web-accessibility-axe 

Haibun Web Accessibility Axe is a module that incorporates Haibun's integration and testing with that of Axe, an accessibility test engine. 

### Installation

Normally, libraries from this repository will be included in a project like any other, or used via the cli, for example, using `npx @haibun/cli`. For more information, you can visit `Haibun` at `https://github.com/withhaibun/haibun`

### Axe 

Axe serves as an accessibility testing ruleset developed by Deque Systems, and follows the international standards set under WCAG. 

### Playwright-Axe 

Playwright-Axe is a Node library to combine the efforts of Playwright and Axe to conduct accessibility tests. 

To download playwright: 

`npm i-D @playwright/test`

To download playwright-axe: 

`npm i-D axe-playwright`

- After the installation, the modules in this repository can be used freely. 

Navigate to the directory:

    cd haibun-e2e-tests

Install the packages:
    
    npm install

- Ensure `http://localhost:4200/` is running.
- Run `npm run test` to execute the haibun e2e tests.


# Getting Started

Install [Node](https://nodejs.org/en/blog/release/v18.13.0) at version 18.13.0.

Install the Angular CLI at version 17.0.0

    npm install -g @angular/cli@17.0.0

Navigate to the project and Install the packages

    npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contributing

All development should be done in branches that branch off `main`. Any new dev work should include unit tests that are in a passing state.

- Create **a new branch** for your work that branches off of `main`.
- Once your work is done, open a pull request to merge back into `main`.
- If the pull request has been approved you are free to merge and close your branch.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
For more information see the official Angular [documentation](https://angular.io/guide/testing).

## Running haibun end-to-end tests

GCcollab frontend incorporates [Haibun's task-specific modules' integration](https://github.com/withhaibun) for functionality and [accessibility](https://github.com/withhaibun/haibun-web-accessibility-axe).

The following describes the testing procedure:

1. Navigate to the directory:
   `cd haibun-e2e-tests`
2. Install the packages:
   `npm install`
3. Ensure `http://localhost:4200/` is running.
4. Run the tests:
   `npm run test`

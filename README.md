# Getting Started

Install [Node](https://nodejs.org/en/blog/release/v16.14.2) at version 16.14.2.  

Install the Angular CLI at version 14.2.1

    npm install -g @angular/cli@14.2.10

Navigate to the project and Install the packages

    npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Contributing

All development should be done in branches that branch off `development`.  Any new dev work should include unit tests that are in a passing state.

- Create **a new branch** for your work that branches off of `development`.
- Once your work is done, open a pull request to merge back into `development`.
- If the pull request has been approved you are free merge and close your branch.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
For more information see the official Angular [documentation](https://angular.io/guide/testing).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

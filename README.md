[![Deploy](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml/badge.svg?branch=main)](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml)

# Summary

This is a stock comparing application exercise, written in Typescript, React.js,  Material UI (MUI) with Vite tooling support.

Deployed application is publicly accessible on Github Pages at:  
https://noyabronok.github.io/vite-ts-react/

# How to use

1. Search for stocks in the Stock Picker by ticker symbol or company name.
1. Select a stock from list of results (up to 3 selections allowed)
1. Observe stock details
1. Remove selected stocks by clicking the X button [TODO add image] on a selected symbol

## Alpha Vantage Limitations
By default, the application connects to Alpha Vantage API to discover stocks.  There are a few issues with this API

1. Limited for demo customers, and does't provide data when requested with high frequency.  E.G. picking 3 stocks quickly back to back.  This can be remedied by [providing paid api key](#alpha-vantage-api-key)
1. Not all stocks have details, especially ones with a period `(.)` in the symbol.  There is no workaround for this issue.

## Alpha Vantage api key
If you own a paid version of Alpha Vantage api key, you can supply it to the application though the URL as the `&apiKey={your_key}` parameter.

## Mock Mode

[TODO add image]

To get around live API limitations so you can get a quick sense of application behavior, toggle on Mock Mode and search for `Palantir` stocks.

# Development
## Prerequisites: 
- Unix (was tested on Ubuntu v22 but should support other variants, possibly Windows)
- Node 18

## Setup
1. Clone this repo, and switch to project directory
1. Run `npm install`

## Run options
You can run any of the following npm scripts with `npm run {script-name}`  
```
 - dev         runs the app in dev mode
 - lint        runs linter against your code
 - test        runs tests
 - test:dev    runs tests in watch mode, useful while writing tests
 - coverage    runs tests with coverage
 - build       creates a build for dedployment in the dist folder
 - preview     hosts the dist folder for a quick check prior to deploy
 - deploy      (for CI/CD) deploys the build to github pages 
```

## Unit Testing
- Unit testing is supported by [vitest](https://vitest.dev/).  
- Tests will automatically run when you commit locally or create PRs against `develop` or `main` branches.  
- Tests are discovered in files with the following extensionse:  
 ```
 *.test.tsx
 *.test.ts
 ```

- To run existing tests:
```
npm run test
```
- If you're developing tests, you'll save time with watch mode:
```
npm run test:dev
```

## Functional Testing

- Functional testing (aka e2e) is supported by Cypress.io
- TODO!!!

## Deployment
A static website is built in the `dist` folder when `npm run build` is run.  While you can deploy this anywhere you choose, this repo is currently configured to deploy to Github Pages via Github Actions.  The Deploy workflow, as defined in [.github/deploy.yaml](.github/deploy.yaml)
1. Test the main branch  
1. Deploy to Github Pages  
1. Bump minor version in `develop` branch

## Contributing
The `main` branch is used for deployment only, and doesn't allow direct push.  You must create a PR against it.  A good approach is to push your code into `develop` branch first, and then create a PR from `develop` into `main`.

# TODO
Here are some of the things that could be done to improve this application
1. add cypress tests
1. add unit tests
1. extra: add stock details loading feedback
1. extra: refactor mockMode to provide stock details from avantage client instead of from Stock Picker
1. extra: light mode toggle
1. extra: performance: cache selected stock details
1. extra: performance: parallel calls for stock details / consider [useQuery](https://tanstack.com/query/v4/docs/react/reference/useQuery)


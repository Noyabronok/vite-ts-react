[![Deploy](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml/badge.svg?branch=main)](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml)

# Summary

This is a stock comparing application exercise, written in Typescript, React.js,  Material UI (MUI) with Vite tooling support.

Deployed application is publicly accessible on Github Pages at:  
https://noyabronok.github.io/vite-ts-react/

![image](https://user-images.githubusercontent.com/1195319/220213451-61d8f905-7c62-451a-8205-e0b823bcff64.png)

# How to use

1. Search for stocks in the Stock Picker by ticker symbol or company name.
1. Select a stock from list of results (up to 3 selections allowed)
1. Observe stock details
1. Remove selected stocks by clicking the X button ![image](https://user-images.githubusercontent.com/1195319/219965605-33bc6cf8-0ea9-4f4b-964d-5ac22eb37328.png)
 on a selected symbol
1. The url can be bookmarked or shared with others, since it contains selected stocks
1. Stock details are cached for 20 seconds (courtesy of [swr](https://swr.vercel.app/)), but this can be adjusted with `&dedupingInterval={cache_ms}` query string in the url

## Alpha Vantage Limitations
By default, the application connects to Alpha Vantage API to discover stocks.  There are a few issues with this API

1. Limited for demo customers, and does't provide data when requested with high frequency e.g. picking 3 stocks quickly back to back.  This can be remedied by [providing a paid api key](#alpha-vantage-api-key)
1. Not all stocks have details, especially ones with a period `(.)` in the symbol.  There is no workaround for this issue.

## Alpha Vantage api key
If you own a paid version of Alpha Vantage api key, you can supply it to the application though the URL as the `&apiKey={your_key}` parameter.

## Mock Mode

![image](https://user-images.githubusercontent.com/1195319/219965648-1a327121-b1b9-4eb3-a38a-07934231de73.png)

To get around live API limitations in order to get a quick sense of application behavior, toggle on Mock Mode and search for `Palantir` stocks.

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
 - dev           runs the app in dev mode
 - lint          runs linter against your code
 - test          runs tests
 - test:dev      runs tests in watch mode, useful while writing tests
 - coverage      runs tests with coverage
 - cypress:open  open cypress UI for interactive e2e testing
 - cypress       runs e2e tests in headless mode
 - build         creates a build for dedployment in the dist folder
 - preview       hosts the dist folder for a quick check prior to deploy
 - deploy        (for CI/CD) deploys the build to github pages 
```

## Linting and Unit Testing
- ESLint provides linting rules.
- Unit testing is supported by [vitest](https://vitest.dev/).  
- Lint/Tests will automatically run when you commit locally or create PRs against `develop` or `main` branches.  
- You can find lint/test/coverage result in the Actions tab
- Tests files have the following extensions:  
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
- Test files located in the `cypress/e2e` folder
- You can run in UI mode with `npm run cypress:open` or headless with `npm run cypress`.  If you need to adjust the url this can be done inline with `-- --config baseUrl={app_url}` switch, or permanently changed in [cypress.config.ts](cypress.config.ts)


## Deployment
A static website is built in the `dist` folder when `npm run build` is run.  While you can deploy this anywhere you choose, this repo is currently configured to deploy to Github Pages via Github Actions when a pull request is merged into the main branch.  The Deploy workflow, as defined in [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) with the following steps
1. Test the main branch  
1. Deploy to Github Pages  
1. Bump minor version in `develop` branch

[![Deploy](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml/badge.svg?branch=main)](https://github.com/Noyabronok/vite-ts-react/actions/workflows/deploy.yaml) this badge, like the one at the top of this README file, provides the pass/fail status of the latest deploy from the main branch.  You can click on it to get more details.

## Contributing
The `main` branch is used for deployment only, and doesn't allow direct push.  You must create a PR against it.  A good approach is to push your code into `develop` branch first, and then create a PR from `develop` into `main`.

# TODO
Here are some of the things that could be done to improve this application
1. feature: add stock details loading feedback (spinner?)
1. feature: add input validation
1. tech: add more unit tests
1. tech: add more e2e tests
1. performance: refactor / memoize as needed to reduce unnecessary rendering
1. accessibility: keyboard navigation
1. accessibility: update contrast
1. localization: currency symbol based on code


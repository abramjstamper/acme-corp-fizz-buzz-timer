# ACME Corporation Fizz Buzz Time! (Frontend Developer Exercise) Documentation

This is some quick documentation that I put together for this coding challenge.


## File/Folder Structure

* `docs/`                       - requirements/documentation folder
* `web-app/`                    - Create React App's generated folder
* `web-app/public/`             - root html file, images, binaries, etc assets for the web app
* `web-app/src/`                - web app source code 
* `web-app/src/common/`         - helper functions that are shared throughout the application 
* `web-app/src/components/`     - application's react components used
* `web-app/src/styles/`         - scss files with one file per component with the index file importing all other files
* `web-app/src/tests/`          - e2e/unit tests for the application


## Requirements / Install Required Modules

I ran this on Mac OS X with the latest version of [NVM](https://github.com/nvm-sh/nvm) installed. I installed the latest node version using the `--lts` flag. As of this writing, that was Node v12.16.3. This should easily run out of the box on Linux/Ubuntu with Node installed. However, YMMV on Windows.

Once you obtain NodeJS, you'll need to install the `node_modules` by running `npm install` inside the `web-app` directory. It should create a `node_modules` folder in the `web-app` directory with all the dependencies.


## How to Start

To start the application, inside the web-app directory, run `npm start`. If it works, the web app should launch in your default browser to `http://localhost:3000`. The first page will render, which is the timer configuration. 


## Testing

To run the tests including with the application, inside the web-app directory, run `npm test`. To get code coverage, inside the web-app directory, run `npm test -- --coverage`.


## Supported URLs

The only URLs available within the application are listed below:

- `/timer-configuration`
- `/timer-display`
- `*` (wildcard/404) redirects to `/timer-configuration`


## Technical Reasoning

I bootstrapped this project using [create-react-app](https://create-react-app.dev). The goal was to use as much of create-react-app as possible without adding any additional packages. Although I had to add a few tools for the project. Another goal was to heavily use hooks and functional components throughout the application. To handle routing, I used [react-router](https://reacttraining.com/react-router/web/guides/quick-start). Initially, I had planned to use (Bulma)[https://bulma.io] as the CSS library. However, most of the CSS was provided in the documentation. Thus, I transitioned away from using Bulma to `node-sass` and copied the CSS from the requirements into the `scss` files in the `styles` folder. The convention I used was one to one - one `scss` file per component.

To implement the timer, I used one of [Dan Abramov's custom hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/). Creating a `useInterval` hook, instead of programming it using a `useInterval` function in the component abstracted out much of the  logic and created a declarative API to run `useInterval`.

For the tests, I bounced around quite a bit between [enzyme](https://enzymejs.github.io/enzyme/) and [react-testing-library](https://github.com/testing-library/react-testing-library). Full honesty, I haven't written E2E tests since 2017 when I was working in college for a non-profit/ministry. Back in college, I was writing E2E tests for AngularJS with Jasmine/Selenium. In my professional career, I've written some tests/demos with Selenium in Python3. However, all of the testing that I've worked on was unit/functional testing on the server side. I struggled quite a bit with JS Dom; I'm not too familiar with JS Dom. For this demo application, I didn't want to go too far outside the create-react-app family. From an outsider, it seems there's quite a bit of infighting between Enzyme and Jest (react-testing-library), which made it difficult to follow create-react-app's testing documentation. Regardless, I couldn't get the test to "fast forward" using the fake clocks. I tried a few different strategies recommended online, but nothing seemed to actually test the component rendering, which made if difficult to test the `useInterval` hook. The tests are not exceptional, but it was my best effort attempt given the time available. I managed to get 93% code coverage. The few lines that are not tested is the `useInterval` function in `TimerDisplay`. I could not seem to simulate the `setInterval` timer even trying several different methods, libraries, etc. Seems I'm missing something beyond my knowledge at the moment. If this were a *real situation* in the work place, I would have posted a question on Stack Overflow, asked my peers, and continued researching the issue until it's resolved. While this is a significantly small application relative to what I've worked on professionally, I elected to add the PropTypes for a more polished code base. I believe it's easier to do something simple like PropTypes up front than add them in later.


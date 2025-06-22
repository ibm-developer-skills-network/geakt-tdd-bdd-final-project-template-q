const { setWorldConstructor, BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const stoppable = require('stoppable');
const app = require('../../src/app');
const { closeDatabase } = require('../../src/database/connection');

let server;
const PORT = 8080;


class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
    this.clipboard = ''; // Used for copy/paste steps
  }

  async setDriver() {
    const options = new firefox.Options();
    options.addArguments('-headless');

    this.driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();

    await this.driver.manage().setTimeouts({
      implicit: this.parameters.waitTimeout || 10000
    });
  }
}

setWorldConstructor(CustomWorld);

// Create a new browser instance for each scenario
Before(async function () {
  await this.setDriver();
});

// Quit the browser instance after each scenario
After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
    this.clipboard = '';
  }
  
  async setDriver() {
    const options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--headless');
    options.addArguments('--disable-dev-shm-usage');
    
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    await this.driver.manage().setTimeouts({
      implicit: this.parameters.waitTimeout
    });
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.setDriver();
});

After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
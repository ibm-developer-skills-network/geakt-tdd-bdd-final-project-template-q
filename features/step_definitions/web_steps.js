const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');

const ID_PREFIX = 'product_';

When('I visit the {string}', async function (pageName) {
  if (pageName === 'Home Page') {
    await this.driver.get(this.parameters.baseUrl);
    // Uncomment next line to take a screenshot of the web page
    // await this.driver.takeScreenshot().then(data => require('fs').writeFileSync('home_page.png', data, 'base64'));
  }
});

Then('I should see {string} in the title', async function (message) {
  const title = await this.driver.getTitle();
  expect(title).toContain(message);
});

Then('I should not see {string}', async function (textString) {
  const body = await this.driver.findElement(By.tagName('body'));
  const text = await body.getText();
  expect(text).not.toContain(textString);
});

When('I set the {string} to {string}', async function (elementName, textString) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  const element = await this.driver.findElement(By.id(elementId));
  await element.clear();
  await element.sendKeys(textString);
});

When('I select {string} in the {string} dropdown', async function (text, elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  const select = await this.driver.findElement(By.id(elementId));
  const options = await select.findElements(By.tagName('option'));
  
  for (const option of options) {
    const optionText = await option.getText();
    if (optionText === text) {
      await option.click();
      break;
    }
  }
});

Then('I should see {string} in the {string} dropdown', async function (text, elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  const select = await this.driver.findElement(By.id(elementId));
  const selectedOption = await select.findElement(By.css('option:checked'));
  const selectedText = await selectedOption.getText();
  expect(selectedText).toBe(text);
});

Then('the {string} field should be empty', async function (elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  const element = await this.driver.findElement(By.id(elementId));
  const value = await element.getAttribute('value');
  expect(value).toBe('');
});

// Copy and paste functionality
When('I copy the {string} field', async function (elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  await this.driver.wait(until.elementLocated(By.id(elementId)), this.parameters.waitTimeout);
  const element = await this.driver.findElement(By.id(elementId));
  this.clipboard = await element.getAttribute('value');

});

When('I paste the {string} field', async function (elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  await this.driver.wait(until.elementLocated(By.id(elementId)), this.parameters.waitTimeout);
  const element = await this.driver.findElement(By.id(elementId));
  await element.clear();
  await element.sendKeys(this.clipboard);
});

// Button interactions
// UPDATE CODE HERE ##

// Field value checks
Then('I should see {string} in the {string} field', async function (textString, elementName) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  
  await this.driver.wait(async () => {
    const element = await this.driver.findElement(By.id(elementId));
    const value = await element.getAttribute('value');
    return value.includes(textString);
  }, this.parameters.waitTimeout);
});

When('I change {string} to {string}', async function (elementName, textString) {
  const elementId = ID_PREFIX + elementName.toLowerCase().replace(/ /g, '_');
  await this.driver.wait(until.elementLocated(By.id(elementId)), this.parameters.waitTimeout);
  const element = await this.driver.findElement(By.id(elementId));
  await element.clear();
  await element.sendKeys(textString);
});
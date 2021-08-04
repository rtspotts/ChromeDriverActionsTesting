var { Given, When, Then, After} = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require('chromedriver');

// driver setup
const chrome = require('selenium-webdriver/chrome');
var options = new chrome.Options();
options.setChromeBinaryPath("/usr/bin/google-chrome");
options.addArguments("--headless");

const driver = new Builder().setChromeOptions(options).forBrowser("chrome").build();

Given('I am on the Google search page', {timeout: 60 * 1000}, async function () {
    await driver.get('http://www.google.com');
});

When('I search for {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const element = await driver.findElement(By.name('q'));
    element.sendKeys(searchTerm, Key.RETURN);
    element.submit();
});

Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
});

After('end', async function(){
    await driver.quit();
});

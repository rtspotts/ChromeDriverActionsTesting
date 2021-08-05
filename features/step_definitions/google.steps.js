var { Given, When, Then, After} = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require('chromedriver');

// driver setup
const chrome = require('selenium-webdriver/chrome');
var options = new chrome.Options();
options.setChromeBinaryPath("/usr/bin/google-chrome");
options.addArguments("--headless");

//To wait for browser to build and launch properly
let driver = new Builder().setChromeOptions(options).forBrowser("chrome").build();

//To fetch http://google.com from the browser with our code.
Given('I am on the Google search page', {timeout: 60 * 1000}, async function () {
       await driver.get("http://google.com");
});

//To send a search query by passing the value in searchString.
When('I search for {string}', {timeout: 60 * 1000}, async function (searchTerm) {
       await driver.findElement(By.name("q")).sendKeys(searchTerm,Key.RETURN);
});

//Verify the page title and print it
Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
       var title = await driver.getTitle();
       const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
       expect(isTitleStartWithCheese).to.equal(true);
       console.log('Title is:',title);
});

//It is always a safe practice to quit the browser after execution
After('end', async function(){
       await driver.quit();
});

import { When, Then } from 'cucumber';
import browserBot from '../utils/browserBot';
import assert = require('assert');
import { browser } from 'protractor';

var PropertiesReader = require('properties-reader');
var xpathProp = PropertiesReader('./e2e/properties/xpath.properties');
var browserAction: browserBot = new browserBot();

Then("I validate {string} button is present",{timeout:50*1000},async (buttonLabel:string) =>{
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi,buttonLabel);
    var isPresent = await browserAction.isElementPresent(buttonXpath);
    assert.equal(isPresent,true,buttonLabel+" button is expected to present but not present in the page")
});

Then("I validate {string} button is not present",{timeout:50*1000},async (buttonLabel:string) => {
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi,buttonLabel);
    var isPresent = await browserAction.isElementPresent(buttonXpath);
    assert.equal(isPresent,false,buttonLabel+" button is expected not to present but present in the page")
});

Then("I click on {string} button",{timeout:50*1000},async (buttonLabel:string)=>{
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi,buttonLabel);
    await browserAction.clickonClickabeElement(buttonXpath);
    await browser.sleep(10000);
});

Then('I validate {string} dropdown is present', { timeout: 50 * 1000 }, async (dropdownName: string) => {
    var xpath: string = xpathProp.get("dropdown").replace(/#LABEL#/gi, dropdownName);
    var isPresent = await browserAction.isElementPresent(xpath);
    assert.equal(isPresent, true, dropdownName + " dropdown is expected to present but not present in the page");
});


Then('I validate {string} textbox is present', { timeout: 50 * 1000 }, async (textboxName: string) => {
    var xpath: string = xpathProp.get("textbox").replace(/#LABEL#/gi, textboxName);
    var isPresent = await browserAction.isElementPresent(xpath);
    assert.equal(isPresent, true, textboxName + " textbox is not available");
});

Then('I type {string} in {string} textbox', { timeout: 50 * 1000 }, async (value: string, textBoxName: string) => {
    var xpath: string = xpathProp.get("textbox").replace(/#LABEL#/gi, textBoxName);
    await browserAction.sendValue(xpath, value);
    await browser.sleep(5000);
});

Then("I click on {string} filter",{timeout:50*1000},async function(filterName:string){
    var filterXpath = xpathProp.get("filter").replace(/#NAME#/gi,filterName);
    await browserAction.clickonClickabeElement(filterXpath); 
});
import {browser,by, ElementFinder} from "protractor"
import {Given,Then,When} from "cucumber"
import assert = require('assert');
import browserBot from "../utils/browserBot";
import DateUtil from "../utils/DateUtil";

var PropertiesReader = require('properties-reader');
var xpathProp = PropertiesReader('./e2e/properties/xpath.properties');
var browserAction: browserBot = new browserBot();
var dateUtil : DateUtil = new DateUtil();
var baseRateInQuotePage:string = null;
var vechicleTypeInQuotePage:string = null;

Given('I am on Application home page',{timeout:50*1000},async function(){
    await browser.waitForAngularEnabled(false);
    await browser.get(browser.baseUrl);
    await browser.sleep(5000);
});


Then('I validate title is {string}',{timeout:10*1000},async function(expectedTitle:string){
    var actualTitle : string = await browser.getTitle();
    console.log("actualTitle",actualTitle);
    assert.equal(actualTitle,expectedTitle,"Title didn't match");
});


Then("I click on {string} from search results",{timeout:50*1000},async (locationToClick:string)=>{
    var xpath = xpathProp.get("result").replace("#TXT#",locationToClick);
    await browserAction.clickonClickabeElement(xpath);
});

When('I select {string} from {string} dropdown', { timeout: 50 * 1000 }, async function (value: string, label: string) {
    var xpath = xpathProp.get("dropdown").replace(/#LABEL#/gi, label);    
    await browserAction.clickonClickabeElement(xpath);
    var hyperlinkXpath = xpathProp.get("hyperlink").replace(/#TXT#/gi, value);
    await browserAction.clickonClickabeElement(hyperlinkXpath);
});


Then("I select {string} as {int} days from current date",{timeout:50*1000},async (dateType:string,noOfDays:number) =>{
     var date:string = dateUtil.addDaysToCurrentDate(noOfDays);
     var updateDate = `document.getElementById('${dateType}').value='${date}'`;
     await browser.executeScript(updateDate);
});


Then("I validate {string} location is displayed as {string}",{timeout:50*1000},async function(locationType:string,expectedText:string){
    var xpath = xpathProp.get("locationinfo").replace("#TYPE#",locationType);
    var actualText = await browserAction.getTextFromElement(xpath);
    assert.strictEqual(actualText,expectedText,"Value for "+locationType+ "didn't match with entered value "+expectedText);
});


Then("I click on {string} button for {string} car which has {string} and {string}",{timeout:10*5000},async function(buttonName:string,carType:string,noOfDoors:string,noOfSeats:string){
    var searchResultsXpath = xpathProp.get("searchresults");
    var allCars : ElementFinder[] = await browser.element.all(by.xpath(searchResultsXpath));
    var isCarAvailable :boolean = false;
    for(var i =1;i<allCars.length;i++){
            var car: ElementFinder = allCars[i];                    
            var allInformation = await car.element(by.partialLinkText("View Vehicle Information"));
            await allInformation.click();
            let availableDoors : string= await (await car.element(by.className("four-door-feat"))).getText();
            let availableSeats : string= await (await car.element(by.className("four-seats-feat"))).getText();
            if(availableDoors.trim().toLowerCase() == noOfDoors.toLowerCase() && availableSeats.trim().toLowerCase() == noOfSeats.toLowerCase()){
                isCarAvailable=true;
                vechicleTypeInQuotePage = await (await car.element(by.tagName("h3"))).getText();
                baseRateInQuotePage = await (await car.element(by.tagName("price"))).getText();
                var payNowElement = await car.element(by.linkText(buttonName));
                await payNowElement.click()
                await browser.sleep(5000);
                break;
            }
    }
    assert.equal(isCarAvailable,true,"No Cars available to select matching the criteria --> "+noOfDoors+" and "+noOfSeats);    
});

Then("I validate the vehicle type is as same as chosen vehicle",{timeout:50*1000},async function(){
    var vechicleTypeInCheckoutPage = await browserAction.getTextFromElement(xpathProp.get("vehiclenameincheckoutpage"));
    assert.strictEqual(vechicleTypeInCheckoutPage,vechicleTypeInQuotePage,"Vehicle type didn't page");
});

Then("I validate the Base Rate is as same as quote page",{timeout:50*1000},async function(){
    var actualBaseRate = await browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#","Base Rate"));    
    assert.strictEqual("$"+actualBaseRate,baseRateInQuotePage,"Base Rate didn't match between quote page and checkout page");
});


Then("I validate the estimated total with Base Rate, Fees & Taxes",{timeout:50*1000},async function(){
    var actualEstimatedTotal = await browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#","Estimated Total (Prepaid)"));
    var actualBaseRate = await browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#","Base Rate"));
    var actualFeesTaxes = await browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#","Fees & Taxes"));
    var expectedEstimatedTotal:number = Number(actualBaseRate) + Number(actualFeesTaxes);
    assert.equal(Number(actualEstimatedTotal),expectedEstimatedTotal,"Estimated total didn't match. Actual Estimated Total:"+actualEstimatedTotal+" Expected Estimated Total:"+expectedEstimatedTotal);    
});
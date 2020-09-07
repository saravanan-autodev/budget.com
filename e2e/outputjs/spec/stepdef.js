"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const cucumber_1 = require("cucumber");
const assert = require("assert");
const browserBot_1 = require("../utils/browserBot");
const DateUtil_1 = require("../utils/DateUtil");
var PropertiesReader = require('properties-reader');
var xpathProp = PropertiesReader('./e2e/properties/xpath.properties');
var browserAction = new browserBot_1.default();
var dateUtil = new DateUtil_1.default();
var baseRateInQuotePage = null;
var vechicleTypeInQuotePage = null;
cucumber_1.Given('I am on Application home page', { timeout: 50 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.waitForAngularEnabled(false);
        yield protractor_1.browser.get(protractor_1.browser.baseUrl);
        yield protractor_1.browser.sleep(5000);
    });
});
cucumber_1.Then('I validate title is {string}', { timeout: 10 * 1000 }, function (expectedTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        var actualTitle = yield protractor_1.browser.getTitle();
        console.log("actualTitle", actualTitle);
        assert.equal(actualTitle, expectedTitle, "Title didn't match");
    });
});
cucumber_1.Then("I click on {string} from search results", { timeout: 50 * 1000 }, (locationToClick) => __awaiter(void 0, void 0, void 0, function* () {
    var xpath = xpathProp.get("result").replace("#TXT#", locationToClick);
    yield browserAction.clickonClickabeElement(xpath);
}));
cucumber_1.When('I select {string} from {string} dropdown', { timeout: 50 * 1000 }, function (value, label) {
    return __awaiter(this, void 0, void 0, function* () {
        var xpath = xpathProp.get("dropdown").replace(/#LABEL#/gi, label);
        yield browserAction.clickonClickabeElement(xpath);
        var hyperlinkXpath = xpathProp.get("hyperlink").replace(/#TXT#/gi, value);
        yield browserAction.clickonClickabeElement(hyperlinkXpath);
    });
});
cucumber_1.Then("I select {string} as {int} days from current date", { timeout: 50 * 1000 }, (dateType, noOfDays) => __awaiter(void 0, void 0, void 0, function* () {
    var date = dateUtil.addDaysToCurrentDate(noOfDays);
    var updateDate = `document.getElementById('${dateType}').value='${date}'`;
    yield protractor_1.browser.executeScript(updateDate);
}));
cucumber_1.Then("I validate {string} location is displayed as {string}", { timeout: 50 * 1000 }, function (locationType, expectedText) {
    return __awaiter(this, void 0, void 0, function* () {
        var xpath = xpathProp.get("locationinfo").replace("#TYPE#", locationType);
        var actualText = yield browserAction.getTextFromElement(xpath);
        assert.strictEqual(actualText, expectedText, "Value for " + locationType + "didn't match with entered value " + expectedText);
    });
});
cucumber_1.Then("I click on {string} button for {string} car which has {string} and {string}", { timeout: 10 * 5000 }, function (buttonName, carType, noOfDoors, noOfSeats) {
    return __awaiter(this, void 0, void 0, function* () {
        var searchResultsXpath = xpathProp.get("searchresults");
        var allCars = yield protractor_1.browser.element.all(protractor_1.by.xpath(searchResultsXpath));
        var isCarAvailable = false;
        for (var i = 1; i < allCars.length; i++) {
            var car = allCars[i];
            var allInformation = yield car.element(protractor_1.by.partialLinkText("View Vehicle Information"));
            yield allInformation.click();
            let availableDoors = yield (yield car.element(protractor_1.by.className("four-door-feat"))).getText();
            let availableSeats = yield (yield car.element(protractor_1.by.className("four-seats-feat"))).getText();
            if (availableDoors.trim().toLowerCase() == noOfDoors.toLowerCase() && availableSeats.trim().toLowerCase() == noOfSeats.toLowerCase()) {
                isCarAvailable = true;
                vechicleTypeInQuotePage = yield (yield car.element(protractor_1.by.tagName("h3"))).getText();
                baseRateInQuotePage = yield (yield car.element(protractor_1.by.tagName("price"))).getText();
                var payNowElement = yield car.element(protractor_1.by.linkText(buttonName));
                yield payNowElement.click();
                yield protractor_1.browser.sleep(5000);
                break;
            }
        }
        assert.equal(isCarAvailable, true, "No Cars available to select matching the criteria --> " + noOfDoors + " and " + noOfSeats);
    });
});
cucumber_1.Then("I validate the vehicle type is as same as chosen vehicle", { timeout: 50 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var vechicleTypeInCheckoutPage = yield browserAction.getTextFromElement(xpathProp.get("vehiclenameincheckoutpage"));
        assert.strictEqual(vechicleTypeInCheckoutPage, vechicleTypeInQuotePage, "Vehicle type didn't page");
    });
});
cucumber_1.Then("I validate the Base Rate is as same as quote page", { timeout: 50 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var actualBaseRate = yield browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#", "Base Rate"));
        assert.strictEqual("$" + actualBaseRate, baseRateInQuotePage, "Base Rate didn't match between quote page and checkout page");
    });
});
cucumber_1.Then("I validate the estimated total with Base Rate, Fees & Taxes", { timeout: 50 * 1000 }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        var actualEstimatedTotal = yield browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#", "Estimated Total (Prepaid)"));
        var actualBaseRate = yield browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#", "Base Rate"));
        var actualFeesTaxes = yield browserAction.getTextFromElement(xpathProp.get("baserate").replace("#TYPE#", "Fees & Taxes"));
        var expectedEstimatedTotal = Number(actualBaseRate) + Number(actualFeesTaxes);
        assert.equal(Number(actualEstimatedTotal), expectedEstimatedTotal, "Estimated total didn't match. Actual Estimated Total:" + actualEstimatedTotal + " Expected Estimated Total:" + expectedEstimatedTotal);
    });
});
//# sourceMappingURL=stepdef.js.map
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
const cucumber_1 = require("cucumber");
const browserBot_1 = require("../utils/browserBot");
const assert = require("assert");
const protractor_1 = require("protractor");
var PropertiesReader = require('properties-reader');
var xpathProp = PropertiesReader('./e2e/properties/xpath.properties');
var browserAction = new browserBot_1.default();
cucumber_1.Then("I validate {string} button is present", { timeout: 50 * 1000 }, (buttonLabel) => __awaiter(void 0, void 0, void 0, function* () {
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi, buttonLabel);
    var isPresent = yield browserAction.isElementPresent(buttonXpath);
    assert.equal(isPresent, true, buttonLabel + " button is expected to present but not present in the page");
}));
cucumber_1.Then("I validate {string} button is not present", { timeout: 50 * 1000 }, (buttonLabel) => __awaiter(void 0, void 0, void 0, function* () {
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi, buttonLabel);
    var isPresent = yield browserAction.isElementPresent(buttonXpath);
    assert.equal(isPresent, false, buttonLabel + " button is expected not to present but present in the page");
}));
cucumber_1.Then("I click on {string} button", { timeout: 50 * 1000 }, (buttonLabel) => __awaiter(void 0, void 0, void 0, function* () {
    var buttonXpath = xpathProp.get("button").replace(/#LABEL#/gi, buttonLabel);
    yield browserAction.clickonClickabeElement(buttonXpath);
    yield protractor_1.browser.sleep(10000);
}));
cucumber_1.Then('I validate {string} dropdown is present', { timeout: 50 * 1000 }, (dropdownName) => __awaiter(void 0, void 0, void 0, function* () {
    var xpath = xpathProp.get("dropdown").replace(/#LABEL#/gi, dropdownName);
    var isPresent = yield browserAction.isElementPresent(xpath);
    assert.equal(isPresent, true, dropdownName + " dropdown is expected to present but not present in the page");
}));
cucumber_1.Then('I validate {string} textbox is present', { timeout: 50 * 1000 }, (textboxName) => __awaiter(void 0, void 0, void 0, function* () {
    var xpath = xpathProp.get("textbox").replace(/#LABEL#/gi, textboxName);
    var isPresent = yield browserAction.isElementPresent(xpath);
    assert.equal(isPresent, true, textboxName + " textbox is not available");
}));
cucumber_1.Then('I type {string} in {string} textbox', { timeout: 50 * 1000 }, (value, textBoxName) => __awaiter(void 0, void 0, void 0, function* () {
    var xpath = xpathProp.get("textbox").replace(/#LABEL#/gi, textBoxName);
    yield browserAction.sendValue(xpath, value);
    yield protractor_1.browser.sleep(5000);
}));
cucumber_1.Then("I click on {string} filter", { timeout: 50 * 1000 }, function (filterName) {
    return __awaiter(this, void 0, void 0, function* () {
        var filterXpath = xpathProp.get("filter").replace(/#NAME#/gi, filterName);
        yield browserAction.clickonClickabeElement(filterXpath);
    });
});
//# sourceMappingURL=GenericStepDef.js.map
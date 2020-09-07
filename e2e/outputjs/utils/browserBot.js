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
const assert = require("assert");
var EC = protractor_1.ExpectedConditions;
class BrowserActions {
    isElementPresent(webElementXpath) {
        return __awaiter(this, void 0, void 0, function* () {
            let isPresent = yield protractor_1.browser.element(protractor_1.by.xpath(webElementXpath)).isPresent().then((isPresent) => {
                return isPresent;
            });
            return isPresent;
        });
    }
    clickonClickabeElement(webElementXpath) {
        return __awaiter(this, void 0, void 0, function* () {
            var webElement = protractor_1.browser.element(protractor_1.by.xpath(webElementXpath));
            yield protractor_1.browser.wait(EC.elementToBeClickable(webElement), 10000);
            yield webElement.click();
        });
    }
    selectFromDropDown(webElementXpath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var selectElement = yield protractor_1.browser.element(protractor_1.by.xpath(webElementXpath));
                yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(selectElement), 60000);
                yield selectElement.click();
                yield selectElement.all(protractor_1.by.tagName('option')).then((options) => __awaiter(this, void 0, void 0, function* () {
                    options.forEach((option) => __awaiter(this, void 0, void 0, function* () {
                        let optionText = yield option.getText().then((text) => { return text; });
                        if (optionText.trim() == data) {
                            option.click();
                        }
                    }));
                }));
            }
            catch (e) {
                assert.fail("Select drop down unsuccessfull:" + e);
            }
        });
    }
    sendValue(webElementXpath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var webElement = protractor_1.browser.element(protractor_1.by.xpath(webElementXpath));
            yield protractor_1.browser.wait(EC.visibilityOf(webElement), 40000);
            yield webElement.clear();
            yield webElement.sendKeys(data);
        });
    }
    getTextFromAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield protractor_1.browser.switchTo().alert()).getText();
        });
    }
    getTextFromElement(xpath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield protractor_1.browser.element(protractor_1.by.xpath(xpath)).getText();
        });
    }
}
exports.default = BrowserActions;
//# sourceMappingURL=browserBot.js.map
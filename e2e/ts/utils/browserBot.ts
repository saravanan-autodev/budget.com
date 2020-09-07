import { by, ElementFinder, ExpectedConditions, browser } from "protractor";
import assert = require('assert');

var EC = ExpectedConditions;

export default class BrowserActions {
    
    public async isElementPresent(webElementXpath : string){
        let isPresent = await browser.element(by.xpath(webElementXpath)).isPresent().then((isPresent: boolean) => {
            return isPresent;
        });
        return isPresent;
    }

    public async clickonClickabeElement(webElementXpath: string) {
        var webElement = browser.element(by.xpath(webElementXpath));
        await browser.wait(EC.elementToBeClickable(webElement), 10000);
        await webElement.click();   
    }

    public async selectFromDropDown(webElementXpath: string, data: string) {
        try {
            var selectElement: ElementFinder = await browser.element(by.xpath(webElementXpath));
            await browser.wait(ExpectedConditions.visibilityOf(selectElement), 60000);
            await selectElement.click();
            await selectElement.all(by.tagName('option')).then(async (options: ElementFinder[]) => {
                options.forEach(async (option: ElementFinder) => {
                    let optionText = await option.getText().then((text) => { return text; });
                    if (optionText.trim() == data) {
                        option.click();
                    }
                });
            });
        }
        catch (e) {
            assert.fail("Select drop down unsuccessfull:" + e);
        }
    }

    public async sendValue(webElementXpath, data) {
        var webElement = browser.element(by.xpath(webElementXpath));
        await browser.wait(EC.visibilityOf(webElement), 40000);
        await webElement.clear();
        await webElement.sendKeys(data);        
    }  
    
    public async getTextFromAlert(){
        return await (await browser.switchTo().alert()).getText();
    }

    public async getTextFromElement(xpath:string){
        return await browser.element(by.xpath(xpath)).getText();
    }

}
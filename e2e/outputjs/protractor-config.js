"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
const fileUtil = require("./utils/FileUtil");
exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",    
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 50 * 10000,
    baseUrl: "https://www.budget.com",
    chromeDriver: "../WebDrivers/chromedriver.exe",
    restartBrowserBetweenTests: false,
    getPageTimeout: 60000,
    multiCapabilities: [
        { browserName: "chrome" }
    ],
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        '../features/samplescenarios.feature'
    ],
    onPrepare: () => {
        protractor_1.browser.manage().window().maximize();
        fileUtil.FileUtil.removeFilesFromDirectory("./reports/json-output-folder");
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/results.json",
        require: [
            "./spec/"
        ],
        strict: true
    },
    plugins: [{
            package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
            options: {
                automaticallyGenerateReport: true,
                removeExistingJsonReportFile: true,
                displayDuration: true,
                openReportInBrowser: true,
                pageTitle: "Budget.com UI Automation - Report",
                reportName: "Automation Report"
            }
        }]
};
//# sourceMappingURL=protractor-config.js.map
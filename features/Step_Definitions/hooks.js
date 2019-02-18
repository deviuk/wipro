import * as fs from "fs";
import {environment} from "../../protractor-config";

var myHooks = function() {
    this.setDefaultTimeout(200 * 1000);

    this.After((scenario) => {
        if (scenario.isFailed()) {
            console.log("!!!!!!!EXECUTING  FAILURE  !!!!!!!!");
            browser.driver.quit();
        }
    });
};

function getTimeStamp() {
    let today = new Date();

    return [today.getMonth() + 1, "-", today.getDate(), "-",
        today.getFullYear(), "-", today.getHours(), "h-",
        today.getMinutes() + "m"
    ].join("");
}

function writeScreenShot(data, filename) {
    let stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, "base64"));
    stream.end();
}

function takeScreenshotOfCurrentScreen() {
    let screenshots = environment.capabilities.browserName + "-" + getTimeStamp();

    browser.takeScreenshot().then(function(png) {
        writeScreenShot(png, "./cucumber-reports/" + screenshots + ".png");

    });
}

module.exports = myHooks;

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import SearchPanelHelper from "./utils/search-panel-helper";
import ElementHelper from "../utils/element-helper";

chai.use(chaiAsPromised);

function stepDefinitions() {

    let expect = chai.expect;
    let elementHelper = new ElementHelper();
    let searchPanel = new SearchPanelHelper();

    this.Given(/^I have Opened Weather forcast application$/, (next) => {
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl + "/?bdd=true").then(() => {
            browser.executeScript("localStorage.clear();").then(()=> {
                next();
            });
        });
    });

    this.Given(/I enter a cityname "([^"]*)" and press enter$/, (titleNumberSmall, next) => {
        searchPanel.searchInput().clear().sendKeys(titleNumberSmall).then(()=> {
            searchPanel.searchInput().sendKeys(protractor.Key.ENTER).then(() => {
                next();
            });
        });
    });


    this.Then(/^I get the number of rows displayed to be "([^"]*)"$/, (number_of, next) => {
        searchPanel.getSearchResultrows().then((rows) => {
            let days = rows.length;
            let integer = parseInt(number_of, 0);

            expect(integer).to.equal(days);
            next();
        });
    });


    this.Then(/^Error "([^"]*)" is shown below the input field$/, {timeout:20000}, (message, next) => {
        searchPanel.errorText().then((message2)=> {
            expect(message).to.equal(message2);
            next();
        });
    });


}

module.exports = stepDefinitions;

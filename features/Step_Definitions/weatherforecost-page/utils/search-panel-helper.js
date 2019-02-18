/** Class SearchPanelHelper */
import ElementHelper from "../../utils/element-helper";

class SearchPanelHelper {
    constructor() {
        this.elementHelper  = new ElementHelper();
    }


    searchInput() {
        return element(by.id("city"));
    }

    errorText() {
        return browser.executeScript(() => {
            let element = window.document.getElementById("root", "[data-test=error]");
            return element.innerText();
        });

    }

    getSearchResultrows() {

        let searchResultRows = element.all(by.css(".summary"));
        return searchResultRows;
    }

}


export default SearchPanelHelper;

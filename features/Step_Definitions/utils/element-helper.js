/** Class ElementHelper */
class ElementHelper {

    /**
     * Returns a protractor element wrapping the dom element that matches the passed selector
     * @param {string} selector: selector that will match the DOM element that we want to return wrapped as a protractor element
     * @returns {object} protractor element wrapping the dom element that matches the passed selector string
     * @example
     * elementHelper.getElementForSelector("#someButtonElementId").click()
     */
    getElementForSelector(selector) {
        return protractor.element(by.css(selector));
    }

    getElementById(id) {
        return protractor.element(by.id(id));
    }

    /*
     * Returns a protractor element based on selector and n number
     * @param {string} selector: selector that will match the DOM element that we want to return wrapped as a protractor element
     * @param {integer} n: the number of element that will be returned
     * @returns {object} protractor element wrapping the dom element that matches the passed selector string
     * @example
     * elementHelper.getNthElementForSelector("#someButtonElementId", 9).click()
     */
    getNthElementForSelector(selector, n) {
        return protractor.element.all(by.css(selector)).get(n);
    }

    isActiveElement(elementId) {
        return browser.executeScript(() => {
            return document.activeElement.id;
        }).then((activeElementId) => {
            return activeElementId === elementId;
        });
    }

    isActiveElementWithText(text) {
        return browser.executeScript(() => {
            return document.activeElement.text;
        }).then((focusText) => {
            return focusText === text;
        });
    }


    isActiveElementByCss(className) {
        return browser.executeScript(() => {
            return document.activeElement.className;
        }).then((classNames) => {
            return classNames.includes(className);
        });
    }

    setActiveElement(elementId) {
        return browser.executeScript((id) => {
            return document.getElementById(id).focus();
        }, elementId);
    }

    /**
     * Checks if the element contains a particular css class
     * @param {string} elementSelector: selector for a single DOM element that we
     * we want to check to see if it has a particular class name e.g. "#myElementId"
     * @param {string} cssClassName : The css class name we are checking for in the element's className value
     * @param {bool} hasClass : The css class name we are checking for in the element's className value
     * @returns {boolean} true if we are testing if the element contains the class name
     *                  false if we are testing that the element does not contain the class name
     * @example
     * //Checkif the element with id "SearchByPointButton" has the 'activated' css class:
     * elementHelper.elementContainsCssClass("#SearchByPointButton", "activated", true)
     *
     * //Check if the element with id "SearchByPointButton" does not have the "activated" css class:
     * elementHelper.elementContainsCssClass("#SearchByPointButton", "activated", false)
     */
    elementContainsCssClass(elementSelector, cssClassName, hasClass) {
        return browser.executeScript((selector)=> {
            return document.querySelector(selector).className;
        }, elementSelector).then((className) => {
            return hasClass ? className.indexOf(cssClassName) > -1
                : className.indexOf(cssClassName) === -1;
        });
    }

    /**
     * Checks if the element is currently in the expected enabled or disabled state
     * @param {bool} expectedDisabledState:
     * Whether or not we expect the element to be disabled or enabled
     * true if we are checking if the element is disabled
     * false if we are checking if the element is enabled
     * @param {string} elementSelector: selector for a single DOM element that we
     * we want to check the disabled state of e.g. "#myElementId"
     * @returns {boolean} true if the element is disabled, false if is enabled
     * @example
     * //Check if an element has disabled attribute/is disabled -
     * elementHelper.elementHasDisabledAttribute(true, "#theElementId").then(...)
     */
    elementHasDisabledAttribute(expectedDisabledState, elementSelector) {
        return browser.executeScript((selector)=> {
            return document.querySelector(selector).disabled;
        }, elementSelector).then((disabled) => {
            return disabled === expectedDisabledState;
        });
    }

    /**
     * Waits for an element to become enabled or disabled
     * @param {bool} shouldHaveDisabledAttribute:
     * true if we are waiting until the the element is disabled
     * false if we are waiting until the the element is enabled
     * @param {string} elementSelector: selector for a single DOM element that we
     * we want to check the disabled state of e.g. "#myElementId"
     * @returns {Object} Returns a Protractor browser.wait Promise object. The promise will
     * resolve (finish waiting) when the element is disabled (or enabled)
     * @example
     * // Wait for element with id="elementId" to be enabled
     * elementHelper.waitForElementToContainDisabledAttribute(false, "#elementId").then(()=> {
    *    ...do stuff now element is disabled
    * });
     * // Wait for element with id="elementId" to be disabled
     * elementHelper.waitForElementToContainDisabledAttribute(true, "#elementId").then( .. )
     */
    waitForElementToContainDisabledAttribute(shouldHaveDisabledAttribute, elementSelector) {
        return browser.wait(()=> {
            return this.elementHasDisabledAttribute(shouldHaveDisabledAttribute, elementSelector);
        }, 30000);
    }

    /**
     * Waits for an element to contain (or not contain) a particular css class
     * @param {bool} shouldHaveCssClass:
     * true if we are waiting for the the element to have the css class
     * false if we are waiting until the the element does not have the css class
     * @param {string} cssClassName : The css class name we are checking for in the element's className value
     * @param {string} elementSelector: selector for a single DOM element that we
     * we want to check for the css class e.g. "#myElementId"
     * @returns {Object} Returns a Protractor browser.wait Promise object. The promise will
     * resolve (finish waiting) when the element has (or does not have) the css class
     * @example
     * // Wait for the element with id="elementId" to contain the "activated" css class
     * elementHelper.waitForElementToContainCssClass(true, "activated", "#elementId").then(...)
     *
     * // Wait for the element with id="elementId" to not contain the "activated" css class
     * elementHelper.waitForElementToContainCssClass(false, "activated", "#elementId").then(...)
     */
    waitForElementToContainCssClass(shouldHaveCssClass, cssClassName, elementSelector) {
        return browser.wait(()=> {
            return this.elementContainsCssClass(elementSelector, cssClassName, shouldHaveCssClass);
        }, 10000);
    }

    waitForElementToContainAttribute(attributeValue, attribute, elementSelector) {
        return browser.wait(()=> {
            return this.elementHasAttributeValue(elementSelector, attribute, attributeValue);
        }, 30000);
    }

    elementHasAttributeValue(elementSelector, attribute, attributeValue) {
        return browser.executeScript((selector, domAttribute)=> {
            return document.querySelector(selector).getAttribute(domAttribute);
        }, elementSelector, attribute).then((hidden) => {
            return hidden === attributeValue;
        });
    }

    getSelectedOptionById(id) {
        return browser.executeScript((domId) => {
            let options = Array.from(document.querySelectorAll("#" + domId + " option"));

            let fiteredOption = options.find((option) => {
                return option.selected;
            });

            return fiteredOption.value;
        }, id);
    }

    getCheckedElements(selector) {
        return browser.executeScript((elementSelector) => {
            return Array.from(document.querySelectorAll(elementSelector)).filter((el) => el && el.checked);
        }, selector);
    }

    getElementOpacity(element) {
        return browser.executeScript((elm)=> {
            return Number(window.getComputedStyle(elm).opacity);
        }, element);
    }

    /**
     * Waits for an element to be selected or not selected.
     * Typically used to wait until a checkbox is selected (ticked) or not selected (not ticked)
     * @param {bool} shouldBeSelected:
     * true if we are waiting for the the checkbox to be ticked (selected)
     * false if we are waiting until the checkbox to be not ticked (not selected)
     * @param {string} elementSelector: selector for a single element e.g. "#myCheckboxId"
     * @returns {Object} Returns a Protractor browser.wait Promise object. The promise will
     * resolve (finish waiting) when the checkbox has been ticked or unticked
     * @example
     * // Wait for element with id="titleCheckboxMid1" to be ticked/checked
     * elementHelper.waitForElementToBeSelected(true, "#titleCheckboxMid1").then(...)
     *
     * // Wait for element with id="titleCheckboxMid1" to be not ticked/unchecked
     * elementHelper.waitForElementToBeSelected(false, "#titleCheckboxMid1")).then(...)
     */
    waitForElementToBeSelected(shouldBeSelected, elementSelector) {
        return browser.wait(()=> {
            return $(elementSelector).isSelected().then((isSelected)=> {
                return isSelected === shouldBeSelected;
            });
        }, 20000);
    }

    waitForElementToBeSelectedBYID(shouldBeSelected, elementSelector) {
        return browser.wait(()=> {
            return this.getElementById(elementSelector).isSelected().then((isSelected)=> {
                return isSelected === shouldBeSelected;
            });
        }, 20000);
    }

    waitForElementToBeActive(elementId) {
        return browser.wait(()=> {
            return this.isActiveElement(elementId);
        }, 40000);

    }

    waitForElementByClassNameToBeActive(className) {
        return browser.wait(()=> {
            return this.isActiveElementByCss(className);
        }, 40000);

    }

    waitForElementWithTextToBeActive(text) {
        return browser.wait(()=> {
            return this.isActiveElementWithText(text);
        }, 10000);

    }

    /*
     * @returns {boolean} returns true if the Button is
     * the element that currently has focus
     * @example:
     *  wait until Button has browser focus
     * browser.wait(planCreatorHelper.buttonHasFocus(id)).then(()=> {
     *    next();
     * });
     */
    buttonHasFocus(id) {
        return browser.executeScript(() => {
            return document.activeElement.id;
        }).then((activeElementId)=> {
            return activeElementId === id;
        });
    }

    waitForElementToHaveFocus(id) {
        return browser.wait(() => {
            return this.buttonHasFocus(id);
        }, 10000);
    }

    waitForElementToBeVisibleBySelector(selector) {
        let element = this.getElementForSelector(selector);

        return this.waitForElementToBeVisible(element);
    }

    waitForElementToBeVisible(element) {
        let EC = protractor.ExpectedConditions;
        let isVisible = EC.visibilityOf(element);

        return browser.wait(isVisible, 100000);
    }

    waitForElementToBeClickableBySelector(selector) {
        let element = this.getElementForSelector(selector);

        return this.waitForElementToBeClickable(element);
    }

    waitForElementToBeClickable(element) {
        let EC = protractor.ExpectedConditions;
        let isClickable = EC.elementToBeClickable(element);

        return browser.wait(isClickable, 10000);
    }

    waitForElementNotToBeVisibleBySelector(selector) {
        let element = this.getElementForSelector(selector);

        return this.waitForElementNotToBeVisible(element);
    }

    waitForElementNotToBeVisible(element) {
        let EC = protractor.ExpectedConditions;
        let isNotVisible = EC.invisibilityOf(element);

        return browser.wait(isNotVisible, 10000);
    }
}

export default ElementHelper;

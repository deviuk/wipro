export const environment = {

    getPageTimeout: 90000,
    allScriptsTimeout: 500000,

    // Capabilities to be passed to the webdriver instance:
    // This section defines which broswers we want to run the BDDs against

    // Chrome capabilities
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--start-maximized", "--ignore-certificate-errors"]
        },
        version: "60"
    },

    // IE11 capabilities
    //  capabilities: {
    //      browserName: "internet explorer",
    //      acceptSslCert: true,
    //      ignoreProtectedModeSettings: true,
    //      allowBlockedContent : true,
    //      initialBrowserUrl: "https://gis.build.prodev.ros.gov.uk/viewer",
    //      version: "11"
    //  },

    // ** Local test run **
    // Use this baseUrl entry when running tests locally and not using selenium grid.
    baseUrl: "http://localhost:3000/"


    //BUILD1
    // baseUrl: "https://em-vrji-mapb10.prodev.ros.gov.uk"

    //DEV1
    //baseUrl: "https://em-vrgi-mapb06.prodev.ros.gov.uk"

    // ** Selenium Grid Test run **
    // Uncomment the baseUrl below and comment out baseUrl above if you want to run
    // tests on selenium grid. This baseUrl should be the ip address of the universal
    // viewer running on your machine. You can get your machines ip address to use
    // in this baseUrl by typing command   ifconfig (on Linux) in command window
    // SD "http://10.22.3.68:80"
    //baseUrl: "https://10.22.3.77:443"
    //RV baseUrl: "http://10.22.3.75:80"
    //When running on selenium grid //baseUrl: "https://gis.build.prodev.ros.gov.uk:443/viewer"
};

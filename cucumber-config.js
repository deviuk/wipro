import {environment} from "./protractor-config";

exports.config = {
    baseUrl: environment.baseUrl,
    // Uncomment the line below if you want to run tests on seleniumGrid
    //seleniumAddress: environment.seleniumAddress,

    // seleniumArgs: ["-browserTimeout=60"], -- error in Protractor 5.1+ when passing arguments
    seleniumArgs: [],

    capabilities: environment.capabilities,
    // please include any new tests within cucumber-config-ie.js under ie folder and check if theu work with IE11.
    suites: {
        "wipro": [
            "features/Step_Definitions/weatherforecost-page/*.feature"     ],
 
   },

 

   onPrepare: function() {
        //define resize on chrome args, left the function in case of any other usage

    },

    framework: "custom",
    frameworkPath: require.resolve("./node_modules/protractor-cucumber-framework"),
    ignoreUncaughtExceptions:true,
    cucumberOpts: {
        compiler: ["js:babel-register"],
        require: ["./features/Step_Definitions/**/*.js"],
        tags: "@dev",
        format: ["json:./cucumber-reports/report.json"],
        "fail-fast": true
    }
};

# wipro



I have created a folder for weatherforecast , which has index page feature file and the correspondng stepdefinition file, 

1. Scenario 1 i have implemented the first part, if time given i can finish the complete scenario

2. Scenario 2 is the negative scenario.  if time given i can assert the error message ( we need to identify the data-test attribute value)


I would like to update the first scenario for checking the rounded values etc.


if time given i can check the interaction between the weatherforcast and the openweathermap api, by setting up the openweatherapi 



ex:  Given a valid request sent to openweathermap api from weatherforecast
     When the openweathermap api is down
     Then response code is "500"
     And a warning message is displayed

     Given openweathermap api is available
     when a valid read request is sent 
     then response code is '200'

     Given openweathermap api is available
     when a invalid read request is sent
     then response code is "400"

     Given openweathermap api is available
     when a request with invalid authorization token is sent
     then response code is "409"
     and a warnging message is displayed 


   similarly we can create different scenarios for all types of requests

     


        
     
    

   
     
    
     







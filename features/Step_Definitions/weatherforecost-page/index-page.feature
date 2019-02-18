@dev

Feature: Weather forecast page

 
   @dev
    Scenario Outline: Opening Weather forecast application
       
 Given I have Opened Weather forcast application
 
 When I enter a cityname "<cityname>" and press enter
   
 Then I get the number of rows displayed to be "<count>"
    
 When I click on the day "<day>"
        
 Then weather details for the specific day are shown
    
 When I click on the day "<day>"

 Then Weather details for the specific day are not shown



        Examples:
        | cityname    |count|day|
        | Edinburgh   |5    |1  |

 

//* we can extend the above scenario by connecting to database for checking mutltiple values stored in data/src
   
 



   @dev
    Scenario Outline: invalid cities
   
 Given I have Opened Weather forcast application

 When I enter a cityname "<cityname>" and press enter

 Then I get the number of rows displayed to be "<count>"
 
 And  Error "Error retrieving the forecast" is shown below the input field

 Examples:
    | cityname    |count |

    	      | London      | 0    |

	      | 12345l      | 0    |


//* we can extend the above scenario by checking all possible negative scenarios like when we pass cityname has no value, alphanumeric etc





 




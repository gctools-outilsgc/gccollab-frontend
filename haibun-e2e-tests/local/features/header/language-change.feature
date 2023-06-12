
Feature: Change language 

    Backgrounds: environment/service, pages/site 

    On the home webpage

    Scenario: Change to French Language
    When I click the button Language
    Then I should see the home webpage in French

    Scenario: Change to English Language 
    When I click the button Language
    Then I should see the home webpage in English

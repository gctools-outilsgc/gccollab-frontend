
Feature: Change language 

    Backgrounds: environment/service, pages/site 

    go to the home webpage

    Scenario: Change to French Language
    click the button Language
    see "BIENVENUE"

    Scenario: Change to English Language 
    click the button Language
    see "WELCOME"

    page is accessible accepting serious 0 and moderate 0
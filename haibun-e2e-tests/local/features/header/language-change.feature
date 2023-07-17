
Feature: Change language 

    Backgrounds: environment/service, pages/site 

    be on the home webpage

    Scenario: Change to French Language
    click the button Language
    see "BIENVENUE À GCCollab"

    Scenario: Change to English Language 
    click the button Language
    see "WELCOME TO GCCollab"

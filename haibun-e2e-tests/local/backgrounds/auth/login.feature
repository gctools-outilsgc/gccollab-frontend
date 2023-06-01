
Feature: Login

This flow logs the user in using username and password.

    On the gccollab login webpage
    When I input {username} for username input
    And I input {password} for password input
    And I click the button Log in
    Then I should be on the post login page
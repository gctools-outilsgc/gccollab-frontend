
Feature: Search collapse function 

    Backgrounds: environment/service, pages/site

    go to the home webpage
    click the button Search

    click by placeholder "Search GCCollab"

    #checks for the accessibility of the page - based on haibun-web-accessibility-axe 
    page is accessible accepting serious 0 and moderate 0 

Feature: GCTools button feature 

    Backgrounds: environment/service, pages/site

    go to the home webpage 
    click the button GCtools 

    pause until current tab is 2 
    on tab 2 
    be on the gctools webpage 
    see "gctools-outilsgc"

    #checks for the accessibility of the page - based on haibun-web-accessibility-axe 
    page is accessible accepting serious 0 and moderate 0 

Feature: FAQs button feature

    Backgrounds: environment/service, pages/site 

    go to the home webpage 
    click the button FAQs 

    pause until current tab is 2 
    on tab 2 
    be on the support webpage 
    see "Welcome to GCTools Support"

    #checks for the accessibility of the page - based on haibun-web-accessibility-axe 
    page is accessible accepting serious 0 and moderate 0 
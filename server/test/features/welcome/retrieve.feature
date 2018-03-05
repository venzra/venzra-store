@Welcome @WelcomeRetrieve
Feature: Retrieve the welcome page to load the store front

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName          | strapline     | theme                 |
      | Welcome Retrieve A | Strapline One | { "color": "orange" } |
      | Welcome Retrieve B | Strapline Two | { "color": "pink" }   |
      | Welcome Retrieve C |               |                       |

  Scenario: Retrival of the welcome index.html page contains the correct head tags
    Given the request origin headers are set to "welcome-retrieve-a.venzra-test.io"
    And I make a GET request to the API endpoint "/" as "welcome"
    Then there should be a 200 response from the "welcome" request that contains the html:
      | title                         | description   | theme                     |
      | Welcome Retrieve A \| Welcome | Strapline One | /assets/themes/orange.css |

  Scenario: Retrival of the welcome index.html page contains the correct head tags
    Given the request origin headers are set to "welcome-retrieve-b.venzra-test.io"
    And I make a GET request to the API endpoint "/" as "welcome"
    Then there should be a 200 response from the "welcome" request that contains the html:
      | title                         | description   | theme                   |
      | Welcome Retrieve B \| Welcome | Strapline Two | /assets/themes/pink.css |

  Scenario: Retrival of the welcome index.html page contains the correct head tags
    Given the request origin headers are set to "welcome-retrieve-c.venzra-test.io"
    And I make a GET request to the API endpoint "/" as "welcome"
    Then there should be a 200 response from the "welcome" request that contains the html:
      | title                         | description                 | theme                     |
      | Welcome Retrieve C \| Welcome | Welcome to our online store | /assets/themes/indigo.css |

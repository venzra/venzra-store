@Customer @CustomerRetrieve
Feature: Retrieve currently logged in customer information

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName             | status |
      | Customer Retrieve One | ACTIVE |
      | Customer Retrieve Two | ACTIVE |
    And there are the following "customers" records in the database
      | identity                             | password | status | subscription               |
      | customer-retrieve-one@venzra-test.io | PASSWORD | ACTIVE | {{ subscriptions[1]._id }} |

  Scenario: When there is no logged in user there should be no response
    Given the request origin headers are set to "customer-retrieve-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/customer" as "customer"
    Then the status returned from the "customer" request should be a 401 error

  Scenario: After logging in using another subdomain will result in no record
    Given the request origin headers are set to "customer-retrieve-one.venzra-test.io"
    And I am logged in with the "customer-retrieve-one@venzra-test.io" account
    And the request origin headers are set to "customer-retrieve-two.venzra-test.io"
    When I make a GET request to the API endpoint "/api/customer" as "customer"
    Then the status returned from the "customer" request should be a 404 error

  Scenario: Retrieve customer profile information
    Given the request origin headers are set to "customer-retrieve-one.venzra-test.io"
    And I am logged in with the "customer-retrieve-one@venzra-test.io" account
    When I make a GET request to the API endpoint "/api/customer" as "customer"
    Then there should be a 200 response from the "customer" request that contains:
      | _id       | identity                             | status |
      | OBJECT_ID | customer-retrieve-one@venzra-test.io | ACTIVE |

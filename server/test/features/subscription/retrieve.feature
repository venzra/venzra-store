@Registration @RegistrationPlans
Feature: Access a list of plans that a user will be able to subscribe to after registration

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName              | gateway                        |
      | Registration Plans One | { "publicKey": "pk_xxxxxxxx" } |
      | Registration Plans Two | {}                             |

  Scenario: A valid store data set should be returned for a request
    Given the request origin headers are set to "registration-plans-invalid.venzra-test.io"
    And I make a GET request to the API endpoint "/api/subscription" as "subscription"
    Then there should be a 400 error from the "subscription" request that contains:
      | message            |
      | No store available |

  Scenario: A valid store data set should be returned for a request
    Given the request origin headers are set to "registration-plans-one.venzra-test.io"
    And I make a GET request to the API endpoint "/api/subscription" as "subscription"
    Then there should be a 200 response from the "subscription" request that contains:
      | _id       | domainName             | storeName              | gateway     |
      | OBJECT_ID | registration-plans-one | Registration Plans One | pk_xxxxxxxx |
    And there is a cookie called "vid" in the "subscription" response header

  Scenario: A store without a publicKey should still return without error
    Given the request origin headers are set to "registration-plans-two.venzra-test.io"
    And I make a GET request to the API endpoint "/api/subscription" as "subscription"
    Then there should be a 200 response from the "subscription" request that contains:
      | _id       | domainName             | storeName              | gateway |
      | OBJECT_ID | registration-plans-two | Registration Plans Two | ""      |
    And there is a cookie called "vid" in the "subscription" response header

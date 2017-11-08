@Registration @RegistrationPlans
Feature: Access a list of plans that a user will be able to subscribe to after registration

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName              |
      | Registration Plans One |
      | Registration Plans Two |

  Scenario: A valid store data set should be returned for a request
    Given the request origin headers are set to "registration-plans-invalid.venzra-test.io"
    And I make a GET request to the API endpoint "/api/v1/subscription" as "subscription"
    Then there should be a 400 error from the "subscription" request that contains:
      | message            |
      | No store available |

  Scenario: A valid store data set should be returned for a request
    Given the request origin headers are set to "registration-plans-one.venzra-test.io"
    And I make a GET request to the API endpoint "/api/v1/subscription" as "subscription"
    Then there should be a 200 response from the "subscription" request that contains:
      | _id       | domainName             | storeName              |
      | OBJECT_ID | registration-plans-one | Registration Plans One |

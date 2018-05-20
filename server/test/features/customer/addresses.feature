@Customer @CustomerAddresses
Feature: Retrieve currently logged in customer information

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName              | status |
      | Customer Addresses One | ACTIVE |
      | Customer Addresses Two | ACTIVE |
    And there are the following "customers" records in the database
      | identity                              | password | addresses                                                                                                          | status | subscription               |
      | customer-addresses-one@venzra-test.io | PASSWORD | []                                                                                                                 | ACTIVE | {{ subscriptions[1]._id }} |
      | customer-addresses-two@venzra-test.io | PASSWORD | [{ "addressee": "Mr Address", "street": "Street", "county": "County", "postalCode": "po57 3ox", "country": "GB" }] | ACTIVE | {{ subscriptions[1]._id }} |

  Scenario: Adding an address to a customer record (missing fields)
    Given the request origin headers are set to "customer-addresses-one.venzra-test.io"
    And I am logged in with the "customer-addresses-one@venzra-test.io" account
    When I make a POST request to the API endpoint "/api/customer/addresses" as "customer" using:
      | building |
      | one      |
    Then there should be a 400 error from the "customer" request that contains:
      | message           | detail                                                                                                  |
      | Validation failed | ["addressee required", "street required", "county required", "country required", "postalCode required"] |

  Scenario: Adding an address to a customer record all fields present
    Given the request origin headers are set to "customer-addresses-one.venzra-test.io"
    And I am logged in with the "customer-addresses-one@venzra-test.io" account
    When I make a POST request to the API endpoint "/api/customer/addresses" as "customer" using:
      | addressee    | building | street         | city         | county         | postalCode | country |
      | Mr Automated | One      | Example street | Example city | Example county | ex4 mp1    | GB      |
    Then there should be a 200 response from the "customer" request that contains:
      | _id       | identity                              | addresses | status |
      | OBJECT_ID | customer-addresses-one@venzra-test.io | ARRAY[1]  | ACTIVE |
    And the response from the "customer" request has a "addresses" that contains rows:
      | _id       | addressee    | building | street         | city         | county         | postalCode | country |
      | OBJECT_ID | Mr Automated | One      | Example street | Example city | Example county | EX4MP1     | GB      |

  Scenario: Removing an address to a customer record (invalid reference)
    Given the request origin headers are set to "customer-addresses-one.venzra-test.io"
    And I am logged in with the "customer-addresses-two@venzra-test.io" account
    When I make a DELETE request to the API endpoint "/api/customer/addresses/{{ customers[2]._id }}" as "customer"
    Then the status returned from the "customer" request should be 202
    When I make a GET request to the API endpoint "/api/customer" as "check"
    Then there should be a 200 response from the "check" request that contains:
      | _id       | identity                              | addresses | status |
      | OBJECT_ID | customer-addresses-two@venzra-test.io | ARRAY[1]  | ACTIVE |

  Scenario: Removing an address to a customer record (valid reference)
    Given the request origin headers are set to "customer-addresses-one.venzra-test.io"
    And I am logged in with the "customer-addresses-two@venzra-test.io" account
    When I make a DELETE request to the API endpoint "/api/customer/addresses/{{ customers[2].addresses[1]._id }}" as "customer"
    Then the status returned from the "customer" request should be 202
    When I make a GET request to the API endpoint "/api/customer" as "check"
    Then there should be a 200 response from the "check" request that contains:
      | _id       | identity                              | addresses | status |
      | OBJECT_ID | customer-addresses-two@venzra-test.io | ARRAY[0]  | ACTIVE |

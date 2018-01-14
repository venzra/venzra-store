@Orders @OrdersCreate
Feature: Place an order using cart information

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName         | gateway                         | transactions                      | status |
      | Orders Create One | { "privateKey": "pk_xxxxxxxx" } | { "rate": "0.021", "base": "10" } | ACTIVE |
      | Orders Create Two | { "privateKey": "pk_xxxxxxxx" } | { "rate": "0.021", "base": "10" } | ACTIVE |
    Given there are the following "customers" records in the database
      | identity                         | password | status | subscription               |
      | orders-create-one@venzra-test.io | PASSWORD | ACTIVE | {{ subscriptions[1]._id }} |
    And there are the following "products" records in the database
      | subscription               | code          | slug             | displayName      | currentPrice | status   |
      | {{ subscriptions[1]._id }} | CREATE-01-001 | orders-create-a  | Orders Create A  | 9            | ACTIVE   |
      | {{ subscriptions[1]._id }} | CREATE-01-002 | orders-create-aa | Orders Create AA | 99           | ACTIVE   |
      | {{ subscriptions[1]._id }} | CREATE-01-003 | orders-create-b  | Orders Create B  | 999          | INACTIVE |
      | {{ subscriptions[2]._id }} | CREATE-02-001 | orders-create-a  | Orders Create A  | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | CREATE-02-002 | orders-create-b  | Orders Create B  | 999          | INACTIVE |
    And there are the following "carts" records in the database
      | subscription               | items                                                                                                                                   |
      | {{ subscriptions[1]._id }} |                                                                                                                                         |
      | {{ subscriptions[1]._id }} | [{ "product": "{{ products[1]._id }}", "quantity": 2 }, { "product": "{{ products[2]._id }}" }, { "product": "{{ products[3]._id }}" }] |
      | {{ subscriptions[2]._id }} | [{ "product": "{{ products[4]._id }}" }, { "product": "{{ products[5]._id }}" }]                                                        |

  Scenario: Missing request body throws required fields error
    Given the request origin headers are set to "orders-create-one.venzra-test.io"
    When I make an empty POST request to the API endpoint "/api/orders" as "order"
    Then the status returned from the "order" request should be a 401 error

  Scenario: Missing request body throws required fields error
    Given the request origin headers are set to "orders-create-one.venzra-test.io"
    And I am logged in with the "orders-create-one@venzra-test.io" account
    When I make an empty POST request to the API endpoint "/api/orders" as "order"
    Then there should be a 400 error from the "order" request that contains:
      | message           | detail                                                                                               |
      | Validation failed | ["cart required", "shipping required", "destination required", "billing required", "token required"] |

  Scenario: Handle a rejection from stripe occurring when attempting to place an order
    Given the request origin headers are set to "orders-create-one.venzra-test.io"
    And I am logged in with the "orders-create-one@venzra-test.io" account
    And there is a POST consumer at "https://api.stripe.com" for "/v1/charges" that will return "stripe/charges/create-invalid.json" with status 400
    When I make a POST request to the API endpoint "/api/orders" as "order" using:
      | cart               | shipping         | token                                    | destination                                                                                      | billing                                                                                             |
      | {{ carts[2]._id }} | { "value": 500 } | { "id": "tok_xxxxxxxxxxxxxxxxxxxxxxxx" } | { "addressee": "Mr Shipping", "street": "Street", "county": "County", "postalCode": "po57 3ox" } | { "addressee": "Mr Billing", "street": "P.O. Box", "county": "Province", "postalCode": "te37 3od" } |
    Then there should be a 500 error from the "order" request that contains:
      | message                                                    |
      | An external error has occurred - StripeInvalidRequestError |

  Scenario: Cannot use a cart from another subscription to place an order
    Given the request origin headers are set to "orders-create-one.venzra-test.io"
    And I am logged in with the "orders-create-one@venzra-test.io" account
    When I make a POST request to the API endpoint "/api/orders" as "order" using:
      | cart               | shipping         | token                                    | destination                                                                                      | billing                                                                                             |
      | {{ carts[3]._id }} | { "value": 500 } | { "id": "tok_xxxxxxxxxxxxxxxxxxxxxxxx" } | { "addressee": "Mr Shipping", "street": "Street", "county": "County", "postalCode": "po57 3ox" } | { "addressee": "Mr Billing", "street": "P.O. Box", "county": "Province", "postalCode": "te37 3od" } |
    Then there should be a 400 error from the "order" request that contains:
      | message                |
      | Invalid cart reference |

  Scenario: Placing an order with required fields successfully creates a new record
    Given the request origin headers are set to "orders-create-one.venzra-test.io"
    And I am logged in with the "orders-create-one@venzra-test.io" account
    And there is a POST consumer at "https://api.stripe.com" for "/v1/charges" that will return "stripe/charges/create-success.json" with status 200 when called with:
      | amount | currency | application_fee | source                       | statement_descriptor |
      | 1116   | gbp      | 33              | tok_xxxxxxxxxxxxxxxxxxxxxxxx | Orders Create One    |
    And there is a POST consumer at "https://email.eu-west-1.amazonaws.com" that will return status 200
    When I make a POST request to the API endpoint "/api/orders" as "order" using:
      | cart               | shipping         | token                                    | destination                                                                                      | billing                                                                                             |
      | {{ carts[2]._id }} | { "value": 500 } | { "id": "tok_xxxxxxxxxxxxxxxxxxxxxxxx" } | { "addressee": "Mr Shipping", "street": "Street", "county": "County", "postalCode": "po57 3ox" } | { "addressee": "Mr Billing", "street": "P.O. Box", "county": "Province", "postalCode": "te37 3od" } |
    Then there should be a 200 response from the "order" request that contains:
      | _id       | reference       |
      | OBJECT_ID | REGEX[^\d{10}$] |

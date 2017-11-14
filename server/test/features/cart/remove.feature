@Cart @CartRemove
Feature: Removing products from a cart

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName       | status |
      | Cart Remove One | ACTIVE |
      | Cart Remove Two | ACTIVE |
    And there are the following "products" records in the database
      | subscription               | code          | slug           | displayName    | currentPrice | status   |
      | {{ subscriptions[1]._id }} | REMOVE-01-001 | cart-remove-a  | Cart Remove A  | 9            | ACTIVE   |
      | {{ subscriptions[1]._id }} | REMOVE-01-002 | cart-remove-aa | Cart Remove AA | 99           | ACTIVE   |
      | {{ subscriptions[1]._id }} | REMOVE-01-003 | cart-remove-b  | Cart Remove B  | 999          | INACTIVE |
      | {{ subscriptions[2]._id }} | REMOVE-02-001 | cart-remove-a  | Cart Remove A  | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | REMOVE-02-002 | cart-remove-b  | Cart Remove B  | 999          | INACTIVE |
    And there are the following "carts" records in the database
      | subscription               | items                                                                                                          |
      | {{ subscriptions[1]._id }} |                                                                                                                |
      | {{ subscriptions[1]._id }} | [{ "product": "{{ products[1]._id }}" }, { "product": "{{ products[3]._id }}" }]                               |
      | {{ subscriptions[1]._id }} | [{ "product": "{{ products[1]._id }}", "quantity": 3 }, { "product": "{{ products[2]._id }}", "quantity": 2 }] |
      | {{ subscriptions[2]._id }} | [{ "product": "{{ products[4]._id }}" }, { "product": "{{ products[5]._id }}" }]                               |

  Scenario: Removing a product that is not in the cart is ignored
    Given the request origin headers are set to "cart-remove-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[1]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op     | path    | value                 |
      | remove | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | value |
      | OBJECT_ID | ARRAY[0] | 0     |

  Scenario: Removing a product that is inactive does not matter
    Given the request origin headers are set to "cart-remove-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op     | path    | value                 |
      | remove | product | {{ products[3]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | value |
      | OBJECT_ID | ARRAY[1] | 9     |

  Scenario: Updating a cart to remove a product will take it out of the cart
    Given the request origin headers are set to "cart-remove-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op     | path    | value                 |
      | remove | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | value |
      | OBJECT_ID | ARRAY[0] | 0     |

  Scenario: Removing a product that has more than 1 quantity from the cart just decrements the quantity by 1
    Given the request origin headers are set to "cart-remove-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[3]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op     | path    | value                 |
      | remove | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | value |
      | OBJECT_ID | ARRAY[2] | 216   |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                              | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,currentPrice] | 2        |
    And the "cart" request that has an "items" field and row 2 contains:
      | _id       | product                              | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,currentPrice] | 2        |

  Scenario: It is possible to run multiple operations in a single call to remove several quantity or when quantity would hit 0 remove the item
    Given the request origin headers are set to "cart-remove-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[3]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op     | path    | value                 |
      | remove | product | {{ products[1]._id }} |
      | remove | product | {{ products[2]._id }} |
      | remove | product | {{ products[2]._id }} |
      | remove | product | {{ products[2]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | value |
      | OBJECT_ID | ARRAY[1] | 9     |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                              | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,currentPrice] | 1        |

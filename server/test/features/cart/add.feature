@Cart @CartAdd
Feature: Creation of a new product entry

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName    | status |
      | Cart Add One | ACTIVE |
      | Cart Add Two | ACTIVE |
    And there are the following "products" records in the database
      | subscription               | code       | slug        | displayName | storePrice | status   |
      | {{ subscriptions[1]._id }} | ADD-01-001 | cart-add-a  | Cart Add A  | 9          | ACTIVE   |
      | {{ subscriptions[1]._id }} | ADD-01-002 | cart-add-aa | Cart Add AA | 99         | ACTIVE   |
      | {{ subscriptions[1]._id }} | ADD-01-003 | cart-add-b  | Cart Add B  | 999        | INACTIVE |
      | {{ subscriptions[2]._id }} | ADD-02-001 | cart-add-a  | Cart Add A  | 999        | ACTIVE   |
      | {{ subscriptions[2]._id }} | ADD-02-002 | cart-add-b  | Cart Add B  | 999        | INACTIVE |
    And there are the following "carts" records in the database
      | subscription               | items                                                                            |
      | {{ subscriptions[1]._id }} | [{ "product": "{{ products[1]._id }}" }]                                         |
      | {{ subscriptions[1]._id }} |                                                                                  |
      | {{ subscriptions[2]._id }} | [{ "product": "{{ products[4]._id }}" }, { "product": "{{ products[5]._id }}" }] |

  Scenario: Sending an empty patch request doe not alter the cart information
    Given the request origin headers are set to "cart-add-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[1]._id }}"
    When I make an empty PATCH request to the API endpoint "/api/v1/cart" as "cart"
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[1] | DATE_TIME | DATE_TIME |

  Scenario: Updating a cart to add a product
    Given the request origin headers are set to "cart-add-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op  | path    | value                 |
      | add | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[1] | DATE_TIME | DATE_TIME |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |

  Scenario: Updating a cart to add another product
    Given the request origin headers are set to "cart-add-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op  | path    | value                 |
      | add | product | {{ products[2]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[2] | DATE_TIME | DATE_TIME |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |
    And the "cart" request that has an "items" field and row 2 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |

  Scenario: Adding a product that is already in the basket should increment the quantity only
    Given the request origin headers are set to "cart-add-one.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op  | path    | value                 |
      | add | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[2] | DATE_TIME | DATE_TIME |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 2        |
    And the "cart" request that has an "items" field and row 2 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |

  Scenario: If the cart does not exist (for the subscription) a new cart is created automatically and the product added
    Given the request origin headers are set to "cart-add-two.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[2]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op  | path    | value                 |
      | add | product | {{ products[4]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[1] | DATE_TIME | DATE_TIME |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |

  Scenario: Adding a product that does not belong to the subscription is ignored
    Given the request origin headers are set to "cart-add-two.venzra-test.io"
    And I set the "vid" cookie to the value "{{ carts[3]._id }}"
    When I make a PATCH request to the API endpoint "/api/v1/cart" as "cart" using:
      | op  | path    | value                 |
      | add | product | {{ products[1]._id }} |
    Then there should be a 200 response from the "cart" request that contains:
      | _id       | items    | created   | updated   |
      | OBJECT_ID | ARRAY[2] | DATE_TIME | DATE_TIME |
    And the "cart" request that has an "items" field and row 1 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |
    And the "cart" request that has an "items" field and row 2 contains:
      | _id       | product                            | quantity |
      | OBJECT_ID | OBJECT[_id,displayName,storePrice] | 1        |

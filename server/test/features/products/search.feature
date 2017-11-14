@Products @ProductsSearch
Feature: Creation of a new product entry

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName             | status |
      | Products Search One   | ACTIVE |
      | Products Search Two   | ACTIVE |
      | Products Search Three | ACTIVE |
    And there are the following "products" records in the database
      | subscription               | code          | slug               | displayName        | currentPrice | status   |
      | {{ subscriptions[1]._id }} | SEARCH-01-001 | product-search-a   | Product Search A   | 9            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-002 | product-search-aa  | Product Search AA  | 99           | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-003 | product-search-aaa | Product Search AAA | 999          | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-004 | product-search-b   | Product Search B   | 6            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-005 | product-search-bb  | Product Search BB  | 66           | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-006 | product-search-c   | Product Search C   | 0            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-007 | product-search-d   | Product Search D   | 1000         | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-008 | product-search-e   | Product Search E   | 2000         | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-009 | product-search-f   | Product Search F   | 3000         | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-010 | product-search-g   | Product Search G   | 5            | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-011 | product-search-gg  | Product Search GG  | 50           | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-012 | product-search-ggg | Product Search GGG | 500          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-001 | product-search-a   | Product Search A   | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-002 | product-search-b   | Product Search B   | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-003 | product-search-c   | Product Search C   | 999          | INACTIVE |

  Scenario: Requesting a list of products should return only records for that subscription (subscription one)
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/v1/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[9] | 9     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug             | code          | displayName      | currentPrice |
      | OBJECT_ID | product-search-a | SEARCH-01-001 | Product Search A | 9            |

  Scenario: Requesting a list of products should return only records for that subscription (subscription two)
    Given the request origin headers are set to "products-search-two.venzra-test.io"
    When I make a GET request to the API endpoint "/api/v1/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[2] | 2     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug             | code          | displayName      | currentPrice |
      | OBJECT_ID | product-search-a | SEARCH-02-001 | Product Search A | 999          |

  Scenario: Requesting a list of products should return no results when there are no products (subscription three)
    Given the request origin headers are set to "products-search-three.venzra-test.io"
    When I make a GET request to the API endpoint "/api/v1/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[0] | 0     | 0    | 25    |

  Scenario: Requesting a list of products adheres to pagination values for skip and limit
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/v1/products?skip=2&limit=3" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[3] | 9     | 2    | 3     |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug               | code          | displayName        | currentPrice |
      | OBJECT_ID | product-search-aaa | SEARCH-01-003 | Product Search AAA | 999          |

  Scenario: Listing of products supports searching by name
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/v1/products?search=aa" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[2] | 2     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug              | code          | displayName       | currentPrice |
      | OBJECT_ID | product-search-aa | SEARCH-01-002 | Product Search AA | 99           |

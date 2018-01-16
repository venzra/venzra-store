@Products @ProductsSearch
Feature: Creation of a new product entry

  @Seed
  Scenario: Setup test data seed for feature
    Given there are the following "subscriptions" records in the database
      | storeName             | status |
      | Products Search One   | ACTIVE |
      | Products Search Two   | ACTIVE |
      | Products Search Three | ACTIVE |
    And there are the following "images" records in the database
      | subscription               | name                   | usage     | size |
      | {{ subscriptions[1]._id }} | ProductsSearch Image A | feature   | 1024 |
      | {{ subscriptions[1]._id }} | ProductsSearch Image B | promotion | 4096 |
      | {{ subscriptions[2]._id }} | ProductsSearch Image C | feature   | 4096 |
    And there are the following "products" records in the database
      | subscription               | code          | slug               | displayName        | featureImage        | promotionalImage    | currentPrice | status   |
      | {{ subscriptions[1]._id }} | SEARCH-01-001 | product-search-a   | Product Search A   | {{ images[1]._id }} | {{ images[2]._id }} | 9            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-002 | product-search-aa  | Product Search AA  | {{ images[1]._id }} | {{ images[2]._id }} | 99           | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-003 | product-search-aaa | Product Search AAA | {{ images[1]._id }} | {{ images[2]._id }} | 999          | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-004 | product-search-b   | Product Search B   | {{ images[1]._id }} | {{ images[2]._id }} | 6            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-005 | product-search-bb  | Product Search BB  | {{ images[1]._id }} | {{ images[2]._id }} | 66           | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-006 | product-search-c   | Product Search C   | {{ images[1]._id }} | {{ images[2]._id }} | 0            | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-007 | product-search-d   | Product Search D   | {{ images[1]._id }} | {{ images[2]._id }} | 1000         | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-008 | product-search-e   | Product Search E   | {{ images[1]._id }} | {{ images[2]._id }} | 2000         | ACTIVE   |
      | {{ subscriptions[1]._id }} | SEARCH-01-009 | product-search-f   | Product Search F   | {{ images[1]._id }} | {{ images[2]._id }} | 3000         | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-010 | product-search-g   | Product Search G   | {{ images[1]._id }} | {{ images[2]._id }} | 5            | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-011 | product-search-gg  | Product Search GG  | {{ images[1]._id }} | {{ images[2]._id }} | 50           | INACTIVE |
      | {{ subscriptions[1]._id }} | SEARCH-01-012 | product-search-ggg | Product Search GGG | {{ images[1]._id }} | {{ images[2]._id }} | 500          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-001 | product-search-a   | Product Search A   | {{ images[3]._id }} | {{ images[3]._id }} | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-002 | product-search-b   | Product Search B   | {{ images[3]._id }} | {{ images[3]._id }} | 999          | ACTIVE   |
      | {{ subscriptions[2]._id }} | SEARCH-02-003 | product-search-c   | Product Search C   | {{ images[3]._id }} | {{ images[3]._id }} | 999          | INACTIVE |

  Scenario: Requesting a list of products should return only records for that subscription (subscription one)
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[9] | 9     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug             | code          | displayName      | promotionalImage    | currentPrice |
      | OBJECT_ID | product-search-a | SEARCH-01-001 | Product Search A | {{ images[2]._id }} | 9            |

  Scenario: Requesting a list of products should return only records for that subscription (subscription two)
    Given the request origin headers are set to "products-search-two.venzra-test.io"
    When I make a GET request to the API endpoint "/api/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[2] | 2     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug             | code          | displayName      | promotionalImage    | currentPrice |
      | OBJECT_ID | product-search-a | SEARCH-02-001 | Product Search A | {{ images[3]._id }} | 999          |

  Scenario: Requesting a list of products should return no results when there are no products (subscription three)
    Given the request origin headers are set to "products-search-three.venzra-test.io"
    When I make a GET request to the API endpoint "/api/products" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[0] | 0     | 0    | 25    |

  Scenario: Requesting a list of products adheres to pagination values for skip and limit
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/products?skip=2&limit=3" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[3] | 9     | 2    | 3     |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug               | code          | displayName        | promotionalImage    | currentPrice |
      | OBJECT_ID | product-search-aaa | SEARCH-01-003 | Product Search AAA | {{ images[2]._id }} | 999          |

  Scenario: Listing of products supports searching by name
    Given the request origin headers are set to "products-search-one.venzra-test.io"
    When I make a GET request to the API endpoint "/api/products?search=aa" as "product"
    Then there should be a 200 response from the "product" request that contains:
      | list     | total | skip | limit |
      | ARRAY[2] | 2     | 0    | 25    |
    And the "product" request that has a "list" field and row 1 contains:
      | _id       | slug              | code          | displayName       | promotionalImage    | currentPrice |
      | OBJECT_ID | product-search-aa | SEARCH-01-002 | Product Search AA | {{ images[2]._id }} | 99           |

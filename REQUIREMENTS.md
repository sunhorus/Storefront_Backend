# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

```
[
  {
    path: '/api/v1/products',
    methods: [ 'GET', 'POST' ],
  },
  {
    path: '/api/v1/products/:id',
    methods: [ 'GET', 'DELETE', 'PUT' ],
  },
  {
    path: '/api/v1/users',
    methods: [ 'POST' ],
  },
  {
    path: '/api/v1/users/authenticate',
    methods: [ 'POST' ],
  },
  {
    path: '/api/v1/orders',
    methods: [ 'GET', 'POST' ],
  },
  {
    path: '/api/v1/orders/:id',
    methods: [ 'GET', 'DELETE', 'PUT' ],
  },
  {
    path: '/api/v1/orders/:id/products',
    methods: [ 'POST' ],
  }
]
```


<!-- #### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] -->

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password_digest

#### Orders
- id
- status of order (active or complete)
- user_id

### Order_Product
- id 
- order_id
- product_id
- quantity



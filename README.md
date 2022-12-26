### Cardist
Cardist is an e-commerce web application which allows users to buy and sell playing cards and playing card-related products. The functionality is very similar to eBay, albeit with a more narrowly focused market niche. 

The web application has three components: front-end UI, back-end API, and database. The front-end UI is the application website users directly interact with. The back-end API handles database controller requests and should not be seen by the users. Lastly, the PostgreSQL database is hosted on Bit.io (https://bit.io/). Additionally, Stripe services are used to handle credit card payments. 

#### Front-end UI
* The front-end app uses Vue 3, Vue Router, Vuex, Axios, and Tailwind.css.
* Built using Vue 3 CLI template structure.

##### Structure
* Views - main webpages.
* Components - smaller webpage components used/re-used by views (e.g. navigation bar, modals, error message notifications, etc.).
* Store - stores data to be used across multiple views/components.
* Services - handles backend API calls.
* Router - handles navigation between webpages.
* Assets - global styles and placeholder images. 

#### Back-end API
* Uses Node and Express and maintain server connections.
* Uses Sequelize to handle API requests to PostgreSQL.
* Stripe API is also used to handle Stripe service calls for credit card transactions.

##### Structure
* Routes - routes API requests received by the backend-server to the appropriate controller functions.
* Controllers - handles database calls to PostgreSQL.
* Models - each model represents a table structure in PostgreSQL.
* Config - stores environment variables for database connections.
* Migrations - Sequelize scripts used to create database tables.
* Seeders - Sequelize scripts used to populate database table records.

##### Video Demonstration Link: https://youtu.be/EB895EIz5UA

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [{
      id: '846f4e5a-56bc-4649-b89e-17e07e81e70e',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://i.ytimg.com/vi/fcP8rqxvx0E/maxresdefault.jpg', 'https://themagicwarehouse.com/ta5676.jpg', 'https://cdn.shopify.com/s/files/1/0013/7332/products/4fa13796a574d3.44348183_1.jpeg'],
      name: 'Theory11 Sentinels Playing Cards',
      description: 'Limited edition playing cards from Theory11.',
      price: 14.95,
      number_sold: 14,
      created_on: new Date(2022, 0, 1),
      updated_on: new Date(2022, 0, 1)
    },
    {
      id: 'd8d4e79f-eea0-434a-a793-e528c3a10c9e',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://i.ebayimg.com/images/g/sdsAAOSwLr9g8TO9/s-l500.jpg'],
      name: 'Virtuoso SS15',
      description: 'Limited edition playing cards from Virtusoso.',
      price: 23.95,
      number_sold: 6,
      created_on: new Date(2022, 0, 1),
      updated_on: new Date(2022, 0, 1),
    },
    {
      id: 'be1a7f14-702b-4439-9296-a349a7351980',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://cdn.shopify.com/s/files/1/0956/5418/products/monarchs2_1024x1024.jpg?v=1583386901', 'https://cdn.shopify.com/s/files/1/0956/5418/products/55085-full_1024x1024.png?v=1583386901'],
      name: 'Monarchs Playing Cards',
      description: 'Monarchs Playing Cards by Theory11.',
      price: 11.95,
      number_sold: 11,
      created_on: new Date(2022, 0, 1),
      updated_on: new Date(2022, 0, 1)
    },
    {
      id: 'a1ff0c49-7ff7-44f2-804b-ba7c47ef1012',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://cdn.shopify.com/s/files/1/0956/5418/products/61386-full_9d93d324-786f-4e7f-82e9-a3e2a99f9a27_1024x1024.png', 'https://cdn.shopify.com/s/files/1/0956/5418/products/61386-alt1_1024x1024.png', 'https://cdn.shopify.com/s/files/1/0956/5418/products/61386-alt2_1024x1024.png'],
      name: 'Virtuoso SS17',
      description: 'Limited edition playing cards from Virtusoso.',
      price: 21.95,
      number_sold: 8,
      created_on: new Date(2022, 0, 1),
      updated_on: new Date(2022, 0, 1)
    },
    {
      id: 'a7dd71f0-3d06-4982-bccd-5a95e85ab03f',
      seller_id: '78444cea-19f1-4fef-b94a-3837e67677e4',
      images: ['https://cdn.shopify.com/s/files/1/0956/5418/products/67858-alt1_1024x1024.png', 'https://cdn.shopify.com/s/files/1/0956/5418/products/67858-full_1024x1024.png', 'https://cdn.shopify.com/s/files/1/0956/5418/products/67858-alt2_1024x1024.png', 'https://cdn.shopify.com/s/files/1/0956/5418/products/67858-alt3_1024x1024.png'],
      name: 'Virtuoso P1',
      description: 'Limited edition playing cards from Virtusoso.',
      price: 19.95,
      number_sold: 10,
      created_on: new Date(2022, 0, 1),
      updated_on: new Date(2022, 0, 1)
    },
    {
      id: 'bfa041eb-8f96-4fe6-8981-f2f916b21926',
      seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      images: ['https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/ie8a9681-1665670470218.png', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/del2-1665172945003.jpg'],
      name: "Dawn's Early Light",
      description: "Playing cards from King's Wild Project.",
      price: 13.99,
      number_sold: 24,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'e5c502af-8ba3-4933-b968-2c335f09807a',
      seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      images: ['https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/truetttuck-1662651764449.png', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/truettstd10-1656096279574.jpg', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/truettstd6-1656096279639.jpg'],
      name: 'Truett 38 Special',
      description: "Playing cards from King's Wild Project.",
      price: 13.99,
      number_sold: 19,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '0dbf8c46-b309-4ca0-906c-40e821170428',
      seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      images: ['https://www.thecoolector.com/wp-content/uploads/2020/10/robin-hood-playing-cards.jpg', 'https://kardify.com/wp-content/uploads/2020/10/RobinHood_1of9s.jpg', 'https://kardify.com/wp-content/uploads/2020/10/RobinHood-cards_6of8s.jpg', 'https://cdn.shopify.com/s/files/1/0551/6030/7879/products/72029-alt3_800x.png'],
      name: 'Robin Hood Playing Cards',
      description: "Playing cards from King's Wild Project.",
      price: 12.99,
      number_sold: 27,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '7eae9271-aa24-48f9-a337-93f7a9adfdf4',
      seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      images: ['https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/ozdeck-1660848969410.png', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/ozstd9-1659640465954.jpg', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/ozstd13-1659640466033.jpg'],
      name: 'Wizard of Oz Standard Edition',
      description: "Playing cards from King's Wild Project.",
      price: 11.99,
      number_sold: 25,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: 'ff9f88a1-e873-49dc-8ce6-302159e16538',
      seller_id: 'ecd6a4a3-a84c-4a13-9eba-36811a116e41',
      images: ['https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/fronttuck-1655929404300.png', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/eldoradocards1-1655921545185.jpg', 'https://cdn.shopify.com/s/files/1/0218/5956/t/47/assets/eldoradocards2-1655921545165.jpg'],
      name: 'El Dorado Playing Cards',
      description: "Limited edition playing cards from King's Wild Project.",
      price: 39.99,
      number_sold: 7,
      created_on: new Date(),
      updated_on: new Date()
    },
    {
      id: '83ebc0a8-5fa3-457b-a0d1-142fc05ae79e',
      seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
      images: ['https://www.meeplemart.com/resize/Shared/Images/Product/Bicycle-Deck-Standard-Poker-Cards/Bicycle-Deck-Standard-Poker-Cards.jpg'],
      name: 'Blue Bicycle Playing Cards',
      description: null,
      price: 6.75,
      number_sold: 47,
      created_on: new Date(2020, 0, 1),
      updated_on: new Date(2020, 0, 1)
    },
    {
      id: '1c8a3e66-4212-45c9-8fd3-e7080ea995d8',
      seller_id: '257cfb4c-0aa4-404e-b878-551964fc5046',
      images: ['https://i.ebayimg.com/images/g/tz0AAOSwX61ZG25y/s-l1600.jpg'],
      name: 'Red Bicycle Playing Cards',
      description: null,
      price: 6.75,
      number_sold: 41,
      created_on: new Date(2020, 0, 1),
      updated_on: new Date(2020, 0, 1)
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('items', null, {});
  }
};

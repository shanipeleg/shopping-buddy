"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        title: "Dairy",
        description:
          "Various dairy products including milk, cheese, yogurt, butter, and eggs",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-cheese",
      },
      {
        title: "Meat",
        description:
          "Various meats including chicken, beef, pork, lamb, turkey, fish, and seafood",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-drumstick-bite",
      },
      {
        title: "Frozen food",
        description:
          "A selection of frozen foods including pre-packaged meals, vegetables, and fruits",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-snowflake",
      },
      {
        title: "Produce",
        description: "Fresh fruits, vegetables, and herbs",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-carrot",
      },
      {
        title: "Grains",
        description:
          "A variety of grains including bread, rice, pasta, cereal, flour, and oats",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-bread-slice",
      },
      {
        title: "Beverages",
        description:
          "A selection of beverages including water, soda, juice, coffee, tea, beer, and wine",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-wine-glass-alt",
      },
      {
        title: "Snacks",
        description:
          "An assortment of snack foods including chips, crackers, nuts, popcorn, cookies, and candy",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-cookie-bite",
      },
      {
        title: "Baking",
        description:
          "Baking essentials such as sugar, baking powder, baking soda, vanilla extract, and cocoa powder",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-cookie",
      },
      {
        title: "Canned and jarred goods",
        description:
          "A range of canned and jarred goods including fruits and vegetables, soup, tuna, and sauces",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-can",
      },
      {
        title: "Personal care",
        description:
          "Personal hygiene and grooming products including shampoo, soap, toothpaste, deodorant, and razors",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-toothbrush",
      },
      {
        title: "Household essentials",
        description:
          "Everyday household essentials including toilet paper, cleaning supplies, laundry detergent, trash bags, and light bulbs",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-home",
      },
      {
        title: "Pet food and supplies",
        description:
          "Pet-related products such as dog food, cat food, litter, toys, and treats",
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: "fas fa-paw",
      },
    ];

    return queryInterface.bulkInsert("categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        title: "Milk",
        description: "Whole milk from a local farm",
        category: "Dairy",
      },
      {
        title: "Ground Beef",
        description: "Freshly ground beef for burgers or meatballs",
        category: "Meat",
      },
      {
        title: "Frozen Pizza",
        description: "A classic pepperoni pizza, ready to bake",
        category: "Frozen food",
      },
      {
        title: "Apples",
        description: "Crisp, juicy apples for snacking or baking",
        category: "Produce",
      },
      {
        title: "Whole Wheat Bread",
        description: "A hearty, whole wheat loaf for sandwiches",
        category: "Grains",
      },
      {
        title: "Orange Juice",
        description: "Freshly squeezed orange juice for breakfast",
        category: "Beverages",
      },
      {
        title: "Potato Chips",
        description: "Classic, salty potato chips for snacking",
        category: "Snacks",
      },
      {
        title: "All-Purpose Flour",
        description: "Versatile flour for baking cakes or breads",
        category: "Baking",
      },
      {
        title: "Canned Corn",
        description: "Sweet, crunchy corn for salads or stews",
        category: "Canned and jarred goods",
      },
      {
        title: "Shampoo",
        description: "Gentle shampoo for all hair types",
        category: "Personal care",
      },
      {
        title: "Toilet Paper",
        description: "Soft, 2-ply toilet paper for the bathroom",
        category: "Household essentials",
      },
      {
        title: "Cat Food",
        description: "Wet cat food with real chicken and veggies",
        category: "Pet food and supplies",
      },
      {
        title: "Cheddar Cheese",
        description: "Sharp cheddar cheese for snacking or cooking",
        category: "Dairy",
      },
      {
        title: "Salmon Fillet",
        description: "Fresh, wild-caught salmon for grilling or roasting",
        category: "Meat",
      },
      {
        title: "Frozen Mixed Vegetables",
        description: "A mix of peas, corn, and carrots for easy side dishes",
        category: "Frozen food",
      },
      {
        title: "Bananas",
        description: "Ripe bananas for snacking or smoothies",
        category: "Produce",
      },
    ];
    const categoriesByTitle = {};
    const categories = await queryInterface.sequelize.query(
      "select id, title from categories"
    );

    categories[0].forEach((category) => {
      categoriesByTitle[category.title] = category.id;
    });

    const itemsMapped = items.map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();
      item.categoryId = categoriesByTitle[item.category];
      delete item.category;
      return item;
    });

    return queryInterface.bulkInsert("items", itemsMapped);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

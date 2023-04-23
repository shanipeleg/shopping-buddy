"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = await queryInterface.sequelize.query("select id from items");
    const lists = await queryInterface.sequelize.query("select id from lists");

    const itemLists = items[0].map((item) => {
      return {
        listId: lists[0][0].id,
        itemId: item.id,
        quantity: Math.floor(Math.random() * 10) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("item_lists", itemLists);
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

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("item_lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      listId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "lists",
          },
          key: "id",
        },
        allowNull: false,
      },
      itemId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "items",
          },
          key: "id",
        },
        allowNull: false,
      },
      quantity: { type: Sequelize.DataTypes.INTEGER, defaultValue: 1 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("item_lists");
  },
};

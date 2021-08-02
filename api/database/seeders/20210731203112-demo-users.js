"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "steve@gmail.com",
          passwordHash:
            "R4IjLy1KEx/83VPJINxOT3vp7rLy8SdjFFLJ+Kg9nJyzVMNrKxGkbCsGf8+vycc6s18hd5JQFXsgNRePK7InD76W+Uz459l0kY1n1XURtGw",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "clark@gmail.com",
          passwordHash:
            "R4IjLy1KEx/83VPJINxOT3vp7rLy8SdjFFLJ+Kg9nJyzVMNrKxGkbCsGf8+vycc6s18hd5JQFXsgNRePK7InD76W+Uz459l0kY1n1XURtGw",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "houston@gmail.com",
          passwordHash:
            "R4IjLy1KEx/83VPJINxOT3vp7rLy8SdjFFLJ+Kg9nJyzVMNrKxGkbCsGf8+vycc6s18hd5JQFXsgNRePK7InD76W+Uz459l0kY1n1XURtGw",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

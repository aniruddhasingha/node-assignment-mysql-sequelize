'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Product", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      product_desc: {
        type: Sequelize.STRING
      },
      fk_image_id: {
        type: Sequelize.INTEGER,
      },
      Status: {
        type: Sequelize.TINYINT
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    }, {
      freezeTableName: true,
      timestamps: true,
      updatedAt: 'updated_on',
      createdAt: 'created_on',
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Product");
  }
};

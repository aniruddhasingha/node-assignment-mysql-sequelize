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
        // fk in image table
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Image",
          key: 'id'
        }
      },
      Status: {
        type: Sequelize.TINYINT
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
     *
     */
    await queryInterface.dropTable("Product");
  }
};

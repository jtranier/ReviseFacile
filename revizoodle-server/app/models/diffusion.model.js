module.exports = (sequelize, Sequelize) => {
  return sequelize.define('diffusion',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        'classe_id': {
          type: Sequelize.BIGINT(11),
          defaultValue: null,
        },
        'nom': {
          type: Sequelize.STRING,
          allowNull: false,
        },
        'date_creation': {
          type: Sequelize.DATE,
          allowNull: false,
        },
        'date_debut': {
          type: Sequelize.DATE,
          allowNull: false,
        },
        'date_fin': {
          type: Sequelize.DATE,
          defaultValue: null,
        },
        'notes': {
          type: Sequelize.TEXT,
        },
        'slug': {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        indexes: [
          {
            fields: ['classe_id'],
            using: 'BTREE',
          }
        ]
      });
};
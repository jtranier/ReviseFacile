module.exports = (sequelize, Sequelize) => {
  return sequelize.define('questionnaire',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        uuid: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'enseignant_id': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'date_creation': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'nom': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      });
};
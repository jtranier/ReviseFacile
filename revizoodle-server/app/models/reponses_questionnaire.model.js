module.exports = (sequelize, Sequelize) => {
  return sequelize.define('reponses_questionnaire',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        'etudiant_id': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'questionnaire_id': {
          type: Sequelize.BIGINT(11),
          allowNull: false,
        },
        choix: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'correctes': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'date': {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        timestamps: false,
        indexes: [
          {
            fields: ['questionnaire_id'],
            using: 'BTREE',
          },
        ],
      });
};
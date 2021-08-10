module.exports = (sequelize, Sequelize) => {
  return sequelize.define('reponse',
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
        'question_id': {
          type: Sequelize.BIGINT(11),
          allowNull: false,
        },
        'date': {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        choix: {
          type: Sequelize.BIGINT(11),
          allowNull: false
        },
        'correcte': {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        indexes: [
          {
            fields: ['questionnaire_id'],
            using: 'BTREE',
          },
          {
            fields: ['question_id'],
            using: 'BTREE',
          }
        ]
      });
};
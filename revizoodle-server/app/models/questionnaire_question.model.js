module.exports = (sequelize, Sequelize) => {
  return sequelize.define('questionnaire_question',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        'questionnaire_id': {
          type: Sequelize.BIGINT(11),
          allowNull: false,
        },
        'questionnaire_uuid': {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        'question_id': {
          type: Sequelize.BIGINT(11),
          allowNull: false,
        },
      },
      {
        timestamps: false,
        indexes: [
          {
            fields: ['question_id'],
            using: 'BTREE',
          },
          {
            fields: ['questionnaire_id'],
            using: 'BTREE',
          },
        ]
      });
};
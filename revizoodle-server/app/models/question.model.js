module.exports = (sequelize, Sequelize) => {
  return sequelize.define('question',
      {
        id: {
          primaryKey: true,
          type: Sequelize.BIGINT(11),
        },
        'auteur_id': {
          type: Sequelize.BIGINT(11),
          defaultValue: null,
        },
        'thematique_id': {
          type: Sequelize.BIGINT(11),
          defaultValue: null,
        },
        'discipline_id': {
          type: Sequelize.BIGINT(11),
          defaultValue: null,
        },
        'niveau_id': {
          type: Sequelize.BIGINT(11),
          defaultValue: null,
        },
        source: {
          type: Sequelize.TEXT,
        },
        'contenu_json': {
          type: Sequelize.TEXT('medium'),
        },
        'date_creation': {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      });
};
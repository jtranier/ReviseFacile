module.exports = (sequelize, Sequelize) => {
  return sequelize.define('diffusion_question',
      {
        'diffusion_id': {
          type: Sequelize.BIGINT(11),
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
            fields: ['diffusion_id'],
            using: 'BTREE',
          },
          {
            fields: ['question_id'],
            using: 'BTREE',
          }
        ]
      });
};
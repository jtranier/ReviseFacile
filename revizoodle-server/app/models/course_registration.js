/**
 * Model to store Moodle Quiz
 */
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('course_registration',
      {
        'learner_uuid': {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        // associated to Course
        // TODO *** check & remove
        // 'course_id': {
        //   type: Sequelize.BIGINT(11),
        // }
      },
  );
};
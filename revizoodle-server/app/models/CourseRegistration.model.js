/**
 * Course <=> Learner association
 * It stores the list of learners registered to a course
 */
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {

  const CourseRegistration = sequelize.define('courseRegistration',
      {
        'learnerUuid': {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
      },
  );

  CourseRegistration.associate = function(models) {
    CourseRegistration.belongsTo(models.Course, {foreignKey: 'courseId'});
  }

  return CourseRegistration;
};
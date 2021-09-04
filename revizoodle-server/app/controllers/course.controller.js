const db = require('../models');
const authenticationService = require('../services/AuthenticationService');
const controllerUtil = require('../controllers/ControllerUtil');

const Course = db.course;
const MoodleQuiz = db.moodleQuiz;
const Course_MoodleQuiz = db.course_moodleQuiz;

exports.get = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  const id = req.params.id;

  Course.findOne({
    where: { id },
    include: {
      model: MoodleQuiz,
    },
  }).then(data => {
    if(!data) {
      res.status(404).json({
        error: {
          message: `There is no course with id ${id}`
        }
      });
      return;
    }

    res.json({
      id: data.dataValues.id,
      name: data.dataValues.name,
      updateAt: data.dataValues.updateAt,
      quizList: data.dataValues.moodleQuizzes.map(quiz => {

        return {
          id: quiz.id,
          name: quiz.name,
          updatedAt: quiz['course_moodleQuiz'].updatedAt,
          nbQuestions: JSON.parse(quiz.questions).length,
        }
      })
    });
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error });
  });

};

exports.list = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  Course.findAll({
    raw: true,
    order: [
      ['updatedAt', 'DESC'],
    ],
    where: {
      'teacherUuid': authenticationService.getUUID(req),
      // TODO Paginate
    },
  }).then(data => {
    res.json(data);
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });
};

exports.create = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }

  Course.create({
    name: req.body.name, // TODO check validity
    teacherUuid: authenticationService.getUUID(req),
  }).then(course => {
    res.json(course['dataValues']);
  }).catch(error => {
    res.status(500).send(error);
  });

};

exports.addQuiz = (req, res) => {
  if (!controllerUtil.checkIsAuthenticated(req, res)) {
    return;
  }
  const courseId = req.params.courseId;
  const quizId = req.body.quizId;

  Course_MoodleQuiz.create({
    courseId: courseId,
    moodleQuizId: quizId
  }).then(() => {
    res.json({
      success: true
    });
  }).catch(error => {
    console.log(error);
    res.status(500).send(error);
  });

};
/*
 * Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
 *
 * contributor(s) :
 * - Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
 * - John Tranier (john.tranier@ticetime.com)
 *
 * This software is governed by the CeCILL-B license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL-B
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept its terms.
 */

/**
 * Controller for learners interact with their Trainings (i.e. submitting
 * theirs answers)
 */
import * as express from "express"
import {Model} from '../models';
import {errorHandler} from './ControllerUtil'

/**
 * Update the answers submitted by the logged Learner to a Quiz
 * URL : /api/learner/training/:trainingId
 */
exports.updateLearnerAnswers = (req: express.Request, res: express.Response) => {

  const questionIndex = req.body.questionIndex;
  const learnerAnswers = JSON.parse(req.body.learnerAnswers);

  learnerAnswers[questionIndex].submitted = true;

  Model.Training.update(
    {
      currentQuestion: questionIndex,
      answers: JSON.stringify(learnerAnswers),
    },
    {
      where: {id: req.params.id},
    },
  ).then((_) => {
    res.json(learnerAnswers);
  }).catch(errorHandler(res));
};

// TODO Hum... Why updating the score that way ?! we should compute & update the score automatically when the last answer to a quiz is submitted...
exports.updateScore = (req: express.Request, res: express.Response) => {
  const score = req.body.score;

  Model.Training.update(
    {
      score: score,
    },
    {
      where: {id: req.params.id},
    },
  ).then((_) => {
    res.json({success: true});
  }).catch(errorHandler(res));
};
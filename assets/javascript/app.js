
class Response {

  constructor(points, responseText) {
    this._points = points;
    this._responseText = responseText;
  }

  get points () {
    return this._points;
  }

  set points (value) {
    this._points = value;
  }

  get responseText () {
    return this._responseText;
  }

  set responseText (value) {
    this._responseText = value;
  }
}

class Question {

  constructor(questionId, questionText, responses) {
    this._questionId = questionId;
    this._questionText = questionText;
    this._responses = responses;
  }

  get questionId () {
    return this._questionId;
  }

  set questionId(value) {
    this._questionId = value;
  }

  get questionText() {
    return this._questionText;
  }

  set questionText(value) {
    this._questionText = value;
  }

  get responses () {
    return this._responses;
  }

  set responses(value) {
    if(value == null) {
      this._responses = [];
    } else {
      this._responses = value;
    }
  }

}

class Play {

  constructor(timeLimit, questions, renderCounterCallback, timeIsUpCallback) {
    this._timeLimit = timeLimit;
    this.questions = questions;
    this._renderCounterCallback = renderCounterCallback;
    this._timeIsUpCallback = timeIsUpCallback;
    this._timerHandler = null;
  }

  get renderCounterCallback () {
    return this._renderCounterCallback;
  }

  set renderCounterCallback (value) {
    this._renderCounterCallback = value;
  }

  get timeIsUpCallback () {
    return this._timeIsUpCallback;
  }

  set timeIsUpCallback (value) {
    this._timeIsUpCallback = value;
  }

  get timeLimit () {
    return this._timeLimit;
  }

  set timeLimit (value) {
    this._timeLimit = value;
  }

  get questions () {
    return this._questions;
  }

  set questions (value) {
    if(value == null) {
      this._questions = [];
    } else {
      this._questions = value;
    }
  }

  startTimer() {
    if(this._timerHandler !== null) {
      this.stopTimer();
    }
    var counter = this._timeLimit;
    var self = this;
    this._timerHandler = setInterval(function () {
      counter = counter - 1;
      self.renderCounterCallback(counter);
      if(counter === 0) {
        self.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if(this._timerHandler !== null) {
      this.renderCounterCallback(0);
      clearInterval(this._timerHandler);
      this._timerHandler = null;
      this._timeIsUpCallback();
    }
  }

}

class Game {

  constructor(score, timeLimit, questions, renderCounterCallback, timeIsUpCallback, play) {
    this._score = score;
    this._timeLimit = timeLimit;
    this.questions = questions;
    this._renderCounterCallback = renderCounterCallback;
    this._timeIsUpCallback = timeIsUpCallback;
    this.play = play;
  }

  get renderCounterCallback () {
    return this._renderCounterCallback;
  }

  set renderCounterCallback (value) {
    this._renderCounterCallback = value;
  }

  get timeIsUpCallback () {
    return this._timeIsUpCallback;
  }

  set timeIsUpCallback (value) {
    this._timeIsUpCallback = value;
  }

  get score () {
    return this._score;
  }

  set score (value) {
    this._score = value;
  }

  get timeLimit () {
    return this._timeLimit;
  }

  set timeLimit (value) {
    this._timeLimit = value;
  }

  get questions() {
    return this._questions;
  }

  set questions (value) {
    if(value == null) {
      this._questions = [];
    } else {
      this._questions = value;
    }
  }

  get play () {
    return this._play;
  }

  set play (value) {
    if(value == null) {
      this._play = this.newPlay();
    } else {
      this._play = value;
    }
  }

  newPlay() {
    return new Play(this.timeLimit, this.questions,
      this.renderCounterCallback, this.timeIsUpCallback);
  }

  static createGame(questions, renderCounterCallback, timeIsUpCallback) {
    return new Game(0, 20, questions, renderCounterCallback, timeIsUpCallback, null);
  }

}


let questions = [
  
  {
    "questionId": 1,
    "questionText": "Question?",
    "responses": [
      {
        "points": 1,
        "responseText": "Response 1"
      },
      {
        "points": 0,
        "responseText": "Response 2"
      },
      {
        "points": 0,
        "responseText": "Response 3"
      },
      {
        "points": 0,
        "responseText": "Response 4"
      }
    ]
  },
  
  {
    "questionId": 3,
    "questionText": "In Aladdin, what is the name of Jasmine’s pet tiger?",
    "responses": [
      {
        "points": 1,
        "responseText": "Rajah"
      },
      {
        "points": 0,
        "responseText": "Anibal"
      }
    ]
  },

  {
    "questionId": 2,
    "questionText": "Question 2?",
    "responses": [
      {
        "points": 0,
        "responseText": "Response 1.b"
      },
      {
        "points": 0,
        "responseText": "Response 2.b"
      },
      {
        "points": 0,
        "responseText": "Response 3.b"
      },
      {
        "points": 1,
        "responseText": "Response 4.b"
      }
    ]
  }];

let game = Game.createGame(questions, renderTimer, endGame);

function renderGame(score, questions) {
  var questionsHtml = "";
  for(var question in questions) {
    questionsHtml += renderQuestion(questions[question].questionId,
      questions[question].questionText,
      questions[question].responses);
  }
  $("#questions").html(questionsHtml);
  renderScore(score);
}

function renderQuestion(questionId, question, responses) {
  var result = "<p>" + questionId + ". " + question + "</p>";
  for(var response in responses) {
    result += "<input type='radio' name='question_" + questionId + "' value='" + responses[response].points + "'> "+ responses[response].responseText + " ";
  }
  result += "<br>";
  return result;
}

function renderTimer(counter) {
  $("#timer").text(counter);
}

function renderScore(score, misses) {
  $("#score").text(score);
  $("#misses").text(misses);
}

function showStart() {
  $("#start").show();
  $("#game").hide();
  renderScore(0,0);
}

function showGame() {
  $("#start").hide();
  $("#game").show();
  startGame();
}

function startGame() {
  renderGame(game.score, game.questions);
  renderTimer(game.timeLimit);
  game.play.startTimer();
}

function calculateCorrectAnswers() {
  var score = game.score;
  $("#question-form input[type=radio]").each(function () {
    if($(this).is(":checked")) {
      score = score + parseInt($(this).attr('value'));
    }
  });
  return score;
}

function endGame() {
  var score = calculateCorrectAnswers();
  var misses = game.questions.length - score;
  renderScore(score, misses);
  game.play.stopTimer();
}

function init() {
  showStart();
  $("#start-button").on('click', function (ev) {
    showGame();
  });
  $("#submit").on('click', function (ev) {
    endGame();
    return false;
  });
  $("#question-form").on('submit', function (ev) {
    endGame();
    return false;
  });
  $("#startover").on('click', function (ev) {
    endGame();
    showStart();
  })
}

init();

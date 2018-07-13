
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
    return new Game(0, 150, questions, renderCounterCallback, timeIsUpCallback, null);
  }

}


let questions = [
  
  
  {
    "questionId": 1,
    "questionText": "In Aladdin, what is the name of Jasmine’s pet tiger?",
    "responses": [
      {
        "points": 1,
        "responseText": "Rajah"
      },
      {
        "points": 0,
        "responseText": "Nilgai"
      },
      {
        "points": 0,
        "responseText": "Chinkara"
      },
      {
        "points": 0,
        "responseText": "Bhaloo"
      },
    ]
  },

{
  "questionId": 2,
  "questionText": "Which Disney movie was the first to have a soundtrack album?",
  "responses": [
    {
      "points": 0,
      "responseText": "Cinderella"
    },
    {
      "points": 0,
      "responseText": "Beauty and The Beast"
    },
    {
      "points": 1,
      "responseText": "Snow White and the Seven Dwarfs"
    },
    {
      "points": 0,
      "responseText": "Little Mermaid"
    }
  ]
},

{
  "questionId": 3,
  "questionText": "Who said this quote: “Think of all the joy you’ll find, when you leave the world behind and bid your cares goodbye. You can fly.”",
  "responses": [
    {
      "points": 0,
      "responseText": "Olaf from Frozen"
    },
    {
      "points": 0,
      "responseText": "Simba from Lion Kink"
    },
    {
      "points": 0,
      "responseText": "Mickey Mouse"
    },
    {
      "points": 1,
      "responseText": "Peter Pan"
    }
  ]
},

{
  "questionId": 4,
  "questionText": "Who was the first Disney princess?",
  "responses": [
    {
      "points": 0,
      "responseText": "Pocahontas"
    },
    {
      "points": 1,
      "responseText": "Snow White"
    },
    {
      "points": 0,
      "responseText": "Jasmine"
    },
    {
      "points": 0,
      "responseText": "Ariel"
    }
  ]
},

{
  "questionId": 5,
  "questionText": "What are the names of Cinderella's evil stepsisters?",
  "responses": [
    {
      "points": 1,
      "responseText": "Anastasia and Drizella"
    },
    {
      "points": 0,
      "responseText": "Beatrice and Daphinie"
    },
    {
      "points": 0,
      "responseText": "Bertha and Cheryl"
    },
    {
      "points": 0,
      "responseText": "Gretel and Helga"
    }
  ]
},

{
  "questionId": 6,
  "questionText": "What does the enchanted cake in Brave turn Merida's mother into?",
  "responses": [
    {
      "points": 0,
      "responseText": "A frog"
    },
    {
      "points": 0,
      "responseText": "A mirror"
    },
    {
      "points": 0,
      "responseText": "A tree"
    },
    {
      "points": 1,
      "responseText": "A bear"
    }
  ]
},

{
  "questionId": 7,
  "questionText": "Who did Pocahontas’ father want her to marry?",
  "responses": [
    {
      "points": 0,
      "responseText": "Siddharth"
    },
    {
      "points": 1,
      "responseText": "Kocoum"
    },
    {
      "points": 0,
      "responseText": "Reyansh"
    },
    {
      "points": 0,
      "responseText": "Aditya"
    }
  ]
},

{
  "questionId": 8,
  "questionText": "What were Aladdin’s three wishes?",
  "responses": [
    {
      "points": 0,
      "responseText": "To marry Jasmine, have a magic carpet and become a prince"
    },
    {
      "points": 1,
      "responseText": "To become a prince, to be rescued from drowning and to free the genie"
    },
    {
      "points": 0,
      "responseText": "To become rich, to become a genie and to have a pet monkey"
    },
    {
      "points": 0,
      "responseText": "To have magic powers, to become rich and to marry Jasmine"
    }
  ]
},

{
  "questionId": 9,
  "questionText": "Which princess is based on a real person?",
  "responses": [
    {
      "points": 1,
      "responseText": "Pocahonstas"
    },
    {
      "points": 0,
      "responseText": "Brave"
    },
    {
      "points": 0,
      "responseText": "Mulan"
    },
    {
      "points": 0,
      "responseText": "Tiana"
    }
  ]
},

{
  "questionId": 10,
  "questionText": "What U.S. city is the setting of The Princess and The Frog inspired by?",
  "responses": [
    {
      "points": 0,
      "responseText": "New York"
    },
    {
      "points": 0,
      "responseText": "Chicago"
    },
    {
      "points": 1,
      "responseText": "New Orleans"
    },
    {
      "points": 0,
      "responseText": "Los Angeles"
    }
  ]
},

{
  "questionId": 11,
  "questionText": "What is the name of the tea cup from Beauty and the Beast?",
  "responses": [
    {
      "points": 1,
      "responseText": "Chip Potts"
    },
    {
      "points": 0,
      "responseText": "Billy Potts"
    },
    {
      "points": 0,
      "responseText": "Chippy Potts"
    },
    {
      "points": 0,
      "responseText": "Tea Cuppy"
    }
  ]
},

{
  "questionId": 12,
  "questionText": "What is the name of Mulan’s pet dragon?",
  "responses": [
    {
      "points": 0,
      "responseText": "Haruto"
    },
    {
      "points": 0,
      "responseText": "Riku"
    },
    {
      "points": 0,
      "responseText": "Asahi"
    },
    {
      "points": 1,
      "responseText": "Mushu"
    }
  ]
},

{
  "questionId": 13,
  "questionText": "In Peter Pan, Captain Hook had a hook on which one of his hands? ",
  "responses": [
    {
      "points": 0,
      "responseText": "He had both hands"
    },
    {
      "points": 0,
      "responseText": "His right hand"
    },
    {
      "points": 0,
      "responseText": "He did not have a hook"
    },
    {
      "points": 1,
      "responseText": "His left hand"
    }
  ]
},
]

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

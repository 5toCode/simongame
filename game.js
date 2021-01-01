let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let gameHasStarted = false;
let level = 0;

const nextSequence = () => {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $('#level-title').text('Level ' + level)
    level ++;
};

// Listen for a click on the buttons via class 'btn'
$('.btn').click(function() {
    // assign clicked button ID (color) and push into array
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickedPattern);
    // pass most recently selected button into checkanswer()
    checkAnswer(userClickedPattern.length - 1);
});

// Function to play color-specific sound
const playSound = name => {
    let audio = new Audio('sounds/' + name +'.mp3')
    audio.play();
}

// Animate when a button gets clicked
const animatePress = currentColor => {
    // create shortcut for button ID
    let currentColorId = '#' + currentColor;
    $(currentColorId).addClass('pressed');
    setTimeout(function() {
        $(currentColorId).removeClass('pressed');
    }, 100);
}

// Listen for keypress to start the game, call nextSequence only once at start
$(document).keypress(function() {
    if (!gameHasStarted) {
        nextSequence();
    }
    gameHasStarted = true;
});

const checkAnswer = currentLevel => {
    // test to see if user clicked button matches randomly selected
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success');
        // test to see if user has completed the sequence
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else console.log('Failure');
}
let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

const nextSequence = () => {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

// Listen for a click on the buttons via class 'btn'
$('.btn').click(function() {
    // assign clicked button ID (color) and push into array
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickedPattern);
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
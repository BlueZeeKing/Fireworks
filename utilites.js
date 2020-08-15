var width = window.innerWidth; // create a height variable
var height = window.innerHeight; // create a width variable
var audio = new Audio('fireworkSound.mp3') // load the firework sound

function radians(x) { // change x degrees to radians
    return x * (Math.PI / 180);
}

function degrees(x) { // change x radians to degrees
    return x * (180 / Math.PI);
}

function random(min, max) { // return a random number
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

function randomColor(colors) { // returns a random color from the array colors
    return colors[Math.floor((Math.random() * colors.length))];
}

function round(num, places) { // round a number to a specific number of places
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function clear(bgColor, ctx, clearRate) { // clear the screen
    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = clearRate;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
}

function airResistance(drag, vX, vY) { // return a new velocity based on the current velocity and air resistance
    let oldVelocity = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2))
    let newVelocity = oldVelocity * 1
    if (oldVelocity > 0) {
        newVelocity -= Math.pow(oldVelocity, 2) * drag
    } else {
        newVelocity += Math.pow(oldVelocity, 2) * drag
    }

    oldVelocity = round(oldVelocity, 3)
    newVelocity = round(newVelocity, 3)

    let scalingFactor = newVelocity / oldVelocity
    let newX = vX * scalingFactor
    let newY = vY * scalingFactor
    return [newX, newY]
}

function fireworkSound() { // play the firework sound
    audio.cloneNode(true).play()
}

function shake(dom) { // shake the screen
    dom.classList.add("shake");
}

function stopShake(dom) { // stop shaking the screen
    dom.classList.remove("shake");
}
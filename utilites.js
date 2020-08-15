var width = window.innerWidth;
var height = window.innerHeight;

function radians(x) {
    return x * (Math.PI / 180);
}

function degrees(x) {
    return x * (180 / Math.PI);
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min)) + min + 1);
}

function randomColor(colors) {
    return colors[Math.floor((Math.random() * colors.length))];
}

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function clear(bgColor, ctx, clearRate) {
    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = clearRate;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
}

function logOnce(line, msg, i) {
    if (i == 0) {
        console.log(line.toString() + ': ' + msg.toString())
    }
}

function airResistance(drag, vX, vY, i) {
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

function fireworkSound() {
    let audio = new Audio('fireworkSound.mp3')
    audio.play()
}

function shake(dom) {
    dom.classList.add("shake");
}
function stopShake(dom) {
    dom.classList.remove("shake");
}
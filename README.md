# Fireworks
A simple JS library that creates fireworks. The fireworks.js file defines the class that can be used to create fireworks and the utilites.js file defines functions that are used by the class. When a firework explodes the whole canvas element shakes and if you want to make sure that the background is not shown  run `document.body.style.backgroundImage = "url('" + canvasObj.toDataURL("image/png") + "')";` which will set the background of the page to the background of the canvas.
## The Fireworks class
The fireworks class takes a canvas DOM as a input but you can also input the background color, the color of the firework (can be an array of colors and will be randomly chosen), and the color of the starting particle.
#### Example:
```javascript
var fireworks = new Fireworks(document.querySelector("canvas"), "navy", "darkgreen", "red"); // canvas dom, background color, main color, launcher color
```
### The launch function
The launch function from the Fireworks class launches a firework to a specific point, from a specific point.
#### Example:
```javascript
fireworks.launch(0,0,100,100); // startX startY endX endY
```
### The update function
The update function from the Fireworks class should run in a constant loop. It handles moving the particles. If it is not run in a loop fireworks will not launch. It takes no parameters.
#### Example:
```javascript
function update () {
    fireworks.update();
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
```
## Basic Setup
```javascript
var fireworks = new Fireworks(document.querySelector("canvas"), "navy", "darkgreen", "red"); // create the firework object

function update () { // update each particle
    fireworks.update();
    requestAnimationFrame(update);
}
requestAnimationFrame(update);

launch(0,0,100,100); // launch a particle
```

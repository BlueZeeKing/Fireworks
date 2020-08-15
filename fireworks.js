class Fireworks {
    constructor(canvasDOM, bgColor = 'black', colors = ['orange'], launchColor = 'yellow') {
        this.clearRate = 0.2; // set up physics and particle settings
        this.gravity = 0.06;
        this.oldAge = 35;

        if (typeof colors === 'string') { // if the color for the firework is a string
            this.colors = [colors]; // set it to a var
        } else {
            this.colors = colors;
        }


        this.canvasDOM = canvasDOM; // set some other vars
        this.canvas = canvasDOM.getContext('2d');
        this.bgColor = bgColor;
        this.launchColor = launchColor;
        this.drag = 0.03;

        clear(bgColor, this.canvas, 1) // clear the canvas

        this.Vs = []; // create a array that will hold the starting velocities for particles

        for (let i = 0; i < 360; i = i + 10) { // set those velocities
            let vX = Math.cos(radians(i)) * 10;
            let vY = Math.sin(radians(i)) * 10;

            this.Vs.push([vX, vY]);
        }

        this.launchParticles = [] // create some arrays to store particles
        this.particles = []
    }

    start(startX, startY) { // create a function that starts the explosion of a firework
        fireworkSound() // play the sound and shake the screen
        shake(this.canvasDOM)
        let res = [];
        let color = randomColor(this.colors)
        console.log(this.colors)
        for (let i = 0; i < this.Vs.length; i++) { // create each particle and set it's start values
            res.push([startX, startY, this.Vs[i][0], this.Vs[i][1], color, 1, 0])
        }
        this.particles = this.particles.concat(res) // add those particles to the main array
    }

    launch(startX, startY, endX, endY) { // create a function that will launch particles
        console.log(startX, startY, endX, endY) // set the starting values
        let dY = endY - startY;
        let dX = endX - startX;
        let a = Math.asin(dX / Math.sqrt(dX ** 2 + dY ** 2))
        let vX = Math.sin(a) * 5
        let vY = Math.cos(a) * 5
        let res = [startX, startY, vX, vY, endX, endY] 
        this.launchParticles = this.launchParticles.concat([res]) // add the particle to the array
    }

    update() { // create a function that updates all particles
        clear(this.bgColor, this.canvas, this.clearRate) // clear the screen a little bit

        if (this.particles.length == 0) { // if there are no particles remove the shake animation
            stopShake(this.canvasDOM)
        }

        for (let i = 0; i < this.particles.length; i++) { // for each particle
            try {
                this.canvas.beginPath(); // draw the particle
                this.canvas.globalAlpha = this.particles[i][5]; // set the opacity of the particle
                this.canvas.fillStyle = this.particles[i][4]; // set the fill style for the particle
                this.canvas.arc(this.particles[i][0], this.particles[i][1], 2, 0, 2 * Math.PI); // draw the particle
                this.canvas.fill();
                this.canvas.globalAlpha = 1;

                this.particles[i][0] += this.particles[i][2] // add the velocity to the position
                this.particles[i][1] += this.particles[i][3]

                this.particles[i][3] += this.gravity // add gravity
                if (this.particles[i][6] > 5) { // add air resitance is the particle is old enough
                    let newVs = airResistance(this.drag, this.particles[i][2], this.particles[i][3], i)
                    this.particles[i][2] = newVs[0]
                    this.particles[i][3] = newVs[1]
                }
                this.particles[i][6]++ // increase the age

                if (this.particles[i][0] < 0 || this.particles[i][0] > width || this.particles[i][1] < 0 || this.particles[i][1] > height || this.particles[i][5] == 0) {
                    this.particles.splice(i, 1); // if this particle is off the screen or not visible delete it
                } else if (this.particles[i][6] > this.oldAge && this.particles[i][5] > 0) { // if the particle is old enough and is not invisible
                    this.particles[i][5] = parseFloat((this.particles[i][5] - 0.05).toFixed(3)); // make it slightly less opaque
                }
            } catch { }
        }
        for (let i = 0; i < this.launchParticles.length; i++) { // for each launch particle
            try {
                this.canvas.beginPath(); // draw the particle
                this.canvas.globalAlpha = 1;
                this.canvas.fillStyle = this.launchColor;
                this.canvas.arc(this.launchParticles[i][0], this.launchParticles[i][1], 2, 0, 2 * Math.PI);
                this.canvas.fill();

                this.launchParticles[i][0] += this.launchParticles[i][2] // add the velocity to the position
                this.launchParticles[i][1] -= this.launchParticles[i][3]

                if (this.launchParticles[i][0] > this.launchParticles[i][4] - 5 && this.launchParticles[i][0] < this.launchParticles[i][4] + 5 && this.launchParticles[i][1] > this.launchParticles[i][5] - 5 && this.launchParticles[i][1] < this.launchParticles[i][5] + 5) { // if this particle is near its destination
                    this.start(this.launchParticles[i][0], this.launchParticles[i][1]) // start the explosion
                    this.launchParticles.splice(i, 1); // delete this particle
                } else if (this.launchParticles[i][0] < 0 || this.launchParticles[i][0] > width || this.launchParticles[i][1] < 0 || this.launchParticles[i][1] > height) {
                    this.launchParticles.splice(i, 1); // if this particle is off the screen delete it
                }
            } catch (e){
                console.log(e)
            }
        }
        if (this.particles.length == 0 && this.launchParticles.length == 0) {
            clear(this.bgColor, this.canvas, 1) // if there are no particles fully clear the screen
        }
    }
}
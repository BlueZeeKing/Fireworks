class Fireworks {
    constructor(canvasDOM, bgColor = 'black', colors = ['orange'], launchColor = 'yellow') {
        this.clearRate = 0.2;
        this.gravity = 0.06;
        this.oldAge = 35;

        if (typeof colors === 'string') {
            this.colors = [colors];
        } else {
            this.colors = colors;
        }


        this.canvasDOM = canvasDOM;
        this.canvas = canvasDOM.getContext('2d');
        this.bgColor = bgColor;
        this.launchColor = launchColor;
        this.drag = 0.03;

        clear(bgColor, this.canvas, 1)

        this.Vs = [];

        for (let i = 0; i < 360; i = i + 10) {
            let vX = Math.cos(radians(i)) * 10;
            let vY = Math.sin(radians(i)) * 10;

            this.Vs.push([vX, vY]);
        }

        this.launchParticles = []
        this.particles = []
    }

    start(startX, startY) {
        fireworkSound()
        shake(this.canvasDOM)
        let res = [];
        let color = randomColor(this.colors)
        console.log(this.colors)
        for (let i = 0; i < this.Vs.length; i++) {
            res.push([startX, startY, this.Vs[i][0], this.Vs[i][1], color, 1, 0])
        }
        this.particles = this.particles.concat(res)
    }

    launch(startX, startY, endX, endY) {
        console.log(startX, startY, endX, endY)
        let dY = endY - startY;
        let dX = endX - startX;
        let a = Math.asin(dX / Math.sqrt(dX ** 2 + dY ** 2))
        let vX = Math.sin(a) * 5
        let vY = Math.cos(a) * 5
        let res = [startX, startY, vX, vY, endX, endY]
        this.launchParticles = this.launchParticles.concat([res])
    }

    update() {
        clear(this.bgColor, this.canvas, this.clearRate)

        if (this.particles.length == 0) {
            stopShake(this.canvasDOM)
        }

        for (let i = 0; i < this.particles.length; i++) {
            try {
                this.canvas.beginPath();
                this.canvas.globalAlpha = this.particles[i][5];
                this.canvas.fillStyle = this.particles[i][4];
                this.canvas.arc(this.particles[i][0], this.particles[i][1], 2, 0, 2 * Math.PI);
                this.canvas.fill();
                this.canvas.globalAlpha = 1;
                this.particles[i][0] += this.particles[i][2]
                this.particles[i][1] += this.particles[i][3]
                this.particles[i][3] += this.gravity
                if (this.particles[i][6] > 5) {
                    let newVs = airResistance(this.drag, this.particles[i][2], this.particles[i][3], i)
                    this.particles[i][2] = newVs[0]
                    this.particles[i][3] = newVs[1]
                }
                this.particles[i][6]++
                if (this.particles[i][0] < 0 || this.particles[i][0] > width || this.particles[i][1] < 0 || this.particles[i][1] > height || this.particles[i][5] == 0) {
                    this.particles.splice(i, 1);
                } else if (this.particles[i][6] > this.oldAge && this.particles[i][5] > 0) {
                    this.particles[i][5] = parseFloat((this.particles[i][5] - 0.05).toFixed(3));
                    //if (i == 0) {
                    //    console.log(this.particles[i][5])
                    //}
                }
            } catch { }
        }
        for (let i = 0; i < this.launchParticles.length; i++) {
            try {
                //console.log([this.launchParticles[i][0],this.launchParticles[i][1]])
                this.canvas.beginPath();
                this.canvas.globalAlpha = 1;
                this.canvas.fillStyle = this.launchColor;
                this.canvas.arc(this.launchParticles[i][0], this.launchParticles[i][1], 2, 0, 2 * Math.PI);
                this.canvas.fill();
                this.launchParticles[i][0] += this.launchParticles[i][2]
                this.launchParticles[i][1] -= this.launchParticles[i][3]
                if (this.launchParticles[i][0] > this.launchParticles[i][4] - 5 && this.launchParticles[i][0] < this.launchParticles[i][4] + 5 && this.launchParticles[i][1] > this.launchParticles[i][5] - 5 && this.launchParticles[i][1] < this.launchParticles[i][5] + 5) {
                    this.start(this.launchParticles[i][0], this.launchParticles[i][1])
                    this.launchParticles.splice(i, 1);
                } else if (this.launchParticles[i][0] < 0 || this.launchParticles[i][0] > width || this.launchParticles[i][1] < 0 || this.launchParticles[i][1] > height) {
                    this.launchParticles.splice(i, 1);
                }
            } catch (e){
                console.log(e)
            }
        }
        if (this.particles.length == 0 && this.launchParticles.length == 0) {
            clear(this.bgColor, this.canvas, 1)
        }
    }
}
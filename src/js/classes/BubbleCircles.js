export default class BubbleCircles {
	constructor(p5, startX, startY, hueOrColour) {
        this.p = p5;
        this.x = startX;
        this.y = startY;
        this.colour = this.isObject(hueOrColour) ? hueOrColour : this.p.color(hueOrColour, 100, 100);
        this.hue = this.colour._getHue();
        this.count = this.p.random(4, 16); 
        this.circles = [];
        for (let i = 0; i < this.count; i++) {
            this.circles.push(
                {
                    x: this.x,
                    y: this.y,
                    size: parseInt(this.p.random(16, 64)),
                    colour: this.p.color(
                        this.hue,
                        this.p.random(50, 100),
                        this.p.random(50, 100),
                    )
                }
            );
        }
    }

    isObject(variable) {
        return typeof variable === 'object' &&
            variable !== null &&
            !Array.isArray(variable);
    }  

    draw(){
        const distanceAdjuster = 40;
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i],
                { x, y, size, colour } = circle;
            if(size > 0) {
                this.p.fill(colour._getHue(),colour._getSaturation(), colour._getBrightness(), 0.2);
                this.p.stroke(colour);
                this.p.strokeWeight(2);
                this.p.ellipse(x, y, size, size);
                this.p.noFill();
                this.p.ellipse(x, y, size / 2, size / 2);
                this.p.ellipse(x, y, size / 4, size / 4);
                this.circles[i].x = x - this.p.random(-distanceAdjuster, distanceAdjuster);    
                this.circles[i].y = y - this.p.random(-distanceAdjuster, distanceAdjuster);    
                this.circles[i].size = size - this.p.random(0.1, 0.4);    
            }
            
        }
    }
}
class GuiDesign extends Gui {
    private pos: number = 0;
    private leds: boolean[][];
    private blink: boolean = false;
    private timer: number = 0;
    
    constructor(screen: Screen) {
        super(screen, GuiName.DESIGN);
        this.leds = [];
        for(let x = 0; x < this.screen.getSize().width; x++) {
            this.leds.push([]);
            for(let y = 0; y < this.screen.getSize().height; y++) {
                this.leds[x].push(false);
            }
        }
    }

    clear() {
        let leds = [];
        for (let x = 0; x < this.screen.getSize().width; x++) {
            leds.push([]);
            for (let y = 0; y < this.screen.getSize().height; y++) {
                leds[x].push(false);
            }
        }
        this.leds = leds;
        this.pos = 0;
        this.blink = false;
        this.timer = 0;
    }

    static renderFromImageData(imageData: boolean[][]) {
        for (let x = 0; x < imageData.length; x++) {
            for (let y = 0; y < imageData[0].length; y++) {
                if (imageData[x][y]) {
                    led.plot(x, y)
                } else {
                    led.unplot(x, y);
                }
            }
        }
    }

    getCursorPosition() {
        let y = Math.floor(this.pos/this.screen.getSize().width);
        let x = this.pos-y*this.screen.getSize().width;
        return {x: x, y: y};
    }

    onPressedButtonA() {
        let pos = this.getCursorPosition();

        this.leds[pos.x][pos.y] = !this.leds[pos.x][pos.y];
    }

    onPressedButtonB() {
        if(this.pos < this.screen.getSize().width*this.screen.getSize().height-1) {
            this.pos++;
        } else {
            this.pos = 0;
        }
    }

    onForever() {
        let position = this.getCursorPosition();
        for (let x = 0; x < this.screen.getSize().width; x++) {
            for (let y = 0; y < this.screen.getSize().height; y++) {
                if(x !== position.x || y !== position.y) {
                    if(this.leds[x][y]) {
                        led.plot(x,y)
                    } else {
                        led.unplot(x,y);
                    }
                }
            }
        }
        if(this.timer > 9) {
            this.timer = 0;
            this.blink = !this.blink;
        } else {
            this.timer++;
        }
        led.plotBrightness(position.x, position.y, (!this.blink ? (this.leds[position.x][position.y] ? 127 : 0) : 255));
    }

    onPressedButtonAB() {
        this.screen.setGui(new GuiSend(screen, this.leds, this))
    }
}
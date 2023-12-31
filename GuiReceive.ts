class GuiReceive extends Gui {
    timer: Timer;
    broadcastTimer: Timer;
    counter = 0;
    received: boolean = false;
    message: string = "";
    
    constructor(screen: Screen) {
        super(screen, GuiName.RECEIVE);
        radio.onReceivedString((data: string) => {
            if(this.screen.getGui() === GuiName.RECEIVE) {
                if(data !== "start" && data !== "end") {
                    this.message = this.message + data + "-";
                }
                if(data === "end") {
                    this.onReceive(this.message.substr(0, this.message.length-1));
                    this.message = "";
                }
            }
        })
        this.timer = new Timer();
        this.broadcastTimer = new Timer();
        this.timer.lastTime = input.runningTime()-500;
    }

    reset() {
        this.timer.reset();
        this.counter = 0;
        this.message = "";
        this.received = false;
    }

    onReceive(data: string) {
        this.received = true;
        basic.clearScreen();
        basic.showLeds(`
        . # . # .
        . # . # .
        . # . # .
        . . . . .
        . # . # .
        `);
        let imageData = EncodingUtils.decodeImageData(data);
        GuiDesign.renderFromImageData(imageData);
    }

    onPressedButtonAB() {
        this.screen.setGui(this.screen.guichoice);
    }

    onPressedButtonA() {
        this.screen.setGui(this.screen.guichoice);
    }

    onPressedButtonB() {
        this.screen.setGui(this.screen.guichoice);
    }

    onForever() {
        if(this.broadcastTimer.hasTimeElapsed(1000)) {
            radio.sendBuffer(Buffer.create(0));
        }
        if(!this.received) {
            if(this.counter > 2) {
                this.counter = 0;
            }
            
            if(this.timer.hasTimeElapsed(500)) {
                basic.clearScreen();
                if (this.counter == 0) {
                    led.plot(0, 2);
                } else if (this.counter == 1) {
                    led.plot(2, 2);
                } else if (this.counter == 2) {
                    led.plot(4, 2);
                }
                this.counter++;
                this.timer.reset();
            }
        }
    }
}
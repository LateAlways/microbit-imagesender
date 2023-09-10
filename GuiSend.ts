class GuiSend extends Gui {
    private imageData: boolean[][];
    private parent: GuiDesign;
    private sending: boolean = false;

    constructor(screen: Screen, data: boolean[][], parent: GuiDesign) {
        super(screen, GuiName.SEND);
        this.imageData = data;
        this.parent = parent;
    }

    onForever() {
        if(!this.sending) {
            basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `);
            if(!this.sending) {
            basic.showLeds(`
            . # # # .
            # . . . #
            . . . # .
            . . . . .
            . . # . .
            `)
            }
        }
    }

    onPressedButtonA() {
        this.parent.clear();
        if(!this.sending) this.screen.setGui(this.parent);
    }

    onPressedButtonB() {
        this.parent.clear();
        if (!this.sending) this.screen.setGui(this.parent);
    }

    onPressedButtonAB() {
        if(this.sending) return;
        this.sending = true;
        basic.clearScreen();
        let totalTimeToWait = 5*30;
        let maxTimeToWait = 1000;
        let timeToWait = maxTimeToWait/totalTimeToWait;

        for(let i=0; i < totalTimeToWait; i++) {
            let currentLed = Math.floor(i/30);
            let currentBrightness = i-currentLed*30;
            led.plotBrightness(currentLed, 2, currentBrightness/30*255);
            basic.pause(timeToWait)
        }
        basic.clearScreen();
        let imageData = EncodingUtils.encodeImagedata(this.imageData).split("-");
        radio.sendString("start");
        imageData.forEach(d => radio.sendString(d));
        radio.sendString("end");
        basic.showIcon(IconNames.Yes);
        basic.pause(500);
        this.screen.setGui(this.screen.guichoice);
    }
}
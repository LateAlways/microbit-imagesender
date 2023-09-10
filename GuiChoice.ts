class GuiChoice extends Gui {

    constructor(screen: Screen) {
        super(screen, GuiName.CHOICE)
    }

    onForever() {
        basic.plotLeds(`
        . # . # .
        . # # # #
        . # . # .
        # # # # .
        . # . # .
        `)
    }

    onPressedButtonA() {
        this.screen.guireceive.reset();
        this.screen.setGui(this.screen.guireceive)
    }

    onPressedButtonB() {
        this.screen.guidesign.clear();
        this.screen.setGui(this.screen.guidesign);
    }
}
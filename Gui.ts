class Gui {
    screen: Screen;
    guiName: GuiName;

    constructor(parent: Screen, guiName: GuiName) {
        this.screen = parent;
        this.guiName = guiName;
    }

    onPressedButtonA() {

    }

    onPressedButtonAB() {

    }

    onPressedButtonB() {

    }

    onForever() {

    }
}

enum GuiName {
    CHOICE,
    DESIGN,
    RECEIVE,
    SEND
}
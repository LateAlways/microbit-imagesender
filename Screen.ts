class Screen {
    private currentGui: Gui;
    private width: number;
    private height: number;
    guidesign: GuiDesign;
    guichoice: GuiChoice;
    guireceive: GuiReceive;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.guidesign = new GuiDesign(this);
        this.guichoice = new GuiChoice(this);
        this.guireceive = new GuiReceive(this);
        
        this.setGui(this.guichoice);

        basic.forever(() => { this.currentGui.onForever(); });
        input.onButtonPressed(Button.A, () => { this.currentGui.onPressedButtonA(); });
        input.onButtonPressed(Button.B, () => { this.currentGui.onPressedButtonB(); });
        input.onButtonPressed(Button.AB, () => { this.currentGui.onPressedButtonAB(); });
    }

    getSize() {
        return { width: this.width, height: this.height }
    }

    getGui() {
        return this.currentGui.guiName;
    }

    setGui(newGui: Gui) {
        this.currentGui = newGui;
    }
}
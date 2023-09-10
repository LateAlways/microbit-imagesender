class Timer {
    lastTime: number;

    constructor() {
        this.lastTime = input.runningTime();
    }

    hasTimeElapsed(time: number, reset: boolean = false): boolean {
        if (input.runningTime() - this.lastTime >= time) {
            this.reset();
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.lastTime = input.runningTime();
    }
}
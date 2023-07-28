import * as PIXI from 'pixi.js';
export declare let terminalText: PIXI.Text;
export declare let charHidingRec: PIXI.Graphics;
export declare class TerminalTextMG {
    private counter;
    private concatenatedStr;
    constructor();
    updateTerminalText(pixiText: PIXI.Text): void;
}

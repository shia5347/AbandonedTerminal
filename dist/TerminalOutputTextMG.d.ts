import * as PIXI from 'pixi.js';
export declare class TerminalOutputTextMG {
    private static counter;
    private static concatenatedStr;
    private static lineIndex;
    private constructor();
    static resetLineIndexPointer(): void;
    static updateTerminalText(pixiText: PIXI.Text, text: string, charHidingRec: PIXI.Graphics, textStyle: PIXI.TextStyle): boolean;
}

import * as PIXI from 'pixi.js';
import * as SOUND from '@pixi/sound';
export declare const computerStartupSound: SOUND.Sound;
export declare class TerminalOutputTextMG {
    private static counter;
    private static concatenatedStr;
    private static lineIndex;
    private constructor();
    static resetLineIndexPointer(): void;
    static playComputerStartupSound(): void;
    static playComputerAmbience(): void;
    static updateTerminalText(pixiText: PIXI.Text, text: string, charHidingRec: PIXI.Graphics, textStyle: PIXI.TextStyle): void;
}
type keyboardPressAndRelease = () => void;
declare class Key {
    value: string;
    isDown: boolean;
    isUp: boolean;
    press: undefined | keyboardPressAndRelease;
    release: undefined | keyboardPressAndRelease;
    pixiTextObj: PIXI.Text;
    constructor(value: string, pixiTextObj: PIXI.Text);
    downHandler: (e: KeyboardEvent) => void;
    upHandler: (e: KeyboardEvent) => void;
    addChar: () => void;
    removeChar: () => void;
    getRandomNumber: (max: number) => number;
}
export declare class TerminalInputTextMG {
    private static counter;
    private constructor();
    static keys: Key[];
    static fillKeysArray: (textObj: PIXI.Text) => void;
    static attachEventListeners: () => void;
    static detachEventListeners: () => void;
    static attachPressAndReleaseFunctions: () => void;
    static initializeTerminalInput: (textObj: PIXI.Text) => void;
}
export {};

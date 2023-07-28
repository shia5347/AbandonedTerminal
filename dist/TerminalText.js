"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalTextMG = exports.charHidingRec = exports.terminalText = void 0;
const PIXI = __importStar(require("pixi.js"));
//Window size
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;
//Terminal text
exports.terminalText = new PIXI.Text("@#: Loading...", {
    fontFamily: "pixelFont",
    fontSize: 24,
    fill: '#12FF00FF',
    wordWrap: true,
    wordWrapWidth: 42 + (SCREEN_WIDTH - 42),
    lineHeight: 42
});
exports.charHidingRec = new PIXI.Graphics(); //This rectangle will slowly show the characters of the terminal text one by one
const textOffsetX = 42;
const textOffsetY = 42;
exports.charHidingRec.beginFill('#001521');
exports.charHidingRec.drawRect(textOffsetX, textOffsetY, SCREEN_WIDTH, 33);
exports.charHidingRec.endFill();
exports.terminalText.position.set(textOffsetX, textOffsetY);
// terminalText printing animation
//Outputs next letter in the sequence of the string.
exports.terminalText.text = "Sinosodial OS v1.0. Please wait...";
const newLineDist = textOffsetY; //Distance between everyline on the terminal
//Terminal text manager
class TerminalTextMG {
    constructor() {
        this.counter = 0;
        this.concatenatedStr = "";
    }
    updateTerminalText(pixiText) {
        var currentLines = pixiText.height / pixiText.style.lineHeight;
        var lineLength; //Length of current terminal line text
        lineLength = this.concatenatedStr.length == 0 ? pixiText.text.length : this.concatenatedStr.length;
        console.log(lineLength);
        if (this.counter < lineLength) {
            exports.charHidingRec.x += PIXI.TextMetrics.measureText("A", pixiText.style).width; //Only works for monospaced fonts
            this.counter++;
        }
        else {
            this.concatenatedStr = "Haha";
            pixiText.text = exports.terminalText.text + "\n" + this.concatenatedStr;
            if (pixiText.height / pixiText.style.lineHeight > currentLines) {
                this.counter = 0;
                //Reset the position of the character hiding rectangle	
                exports.charHidingRec.x = 0;
                exports.charHidingRec.y += textOffsetY; //Move the rectangle to a new line		
            }
            pixiText.updateText(true);
        }
    }
}
exports.TerminalTextMG = TerminalTextMG;
exports.terminalText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
exports.terminalText.resolution = 8;
//# sourceMappingURL=TerminalText.js.map
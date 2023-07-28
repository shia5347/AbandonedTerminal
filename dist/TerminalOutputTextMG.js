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
exports.TerminalOutputTextMG = void 0;
const PIXI = __importStar(require("pixi.js"));
const newLineDist = 42; //Distance between everyline on the terminal
//Terminal output text manager
class TerminalOutputTextMG {
    constructor() {
    }
    static resetLineIndexPointer() {
        this.lineIndex = 0;
    }
    static updateTerminalText(pixiText, text, charHidingRec, textStyle) {
        var currentLines = pixiText.height / pixiText.style.lineHeight;
        var lineLength; //Length of current terminal line text
        const fullText = PIXI.TextMetrics.measureText(text, textStyle).lines;
        lineLength = fullText[this.lineIndex].length;
        if (pixiText.text == "") {
            this.concatenatedStr = fullText[this.lineIndex];
            pixiText.text = this.concatenatedStr;
        }
        if (this.counter < lineLength) {
            charHidingRec.x += PIXI.TextMetrics.measureText("A", pixiText.style).width; //Only works for monospaced fonts
            this.counter++;
        }
        else {
            this.lineIndex++;
            this.concatenatedStr = fullText[this.lineIndex];
            this.counter = 0;
            //Reset the position of the character hiding rectangle	
            charHidingRec.x = 0;
            charHidingRec.y += newLineDist; //Move the rectangle to a new line		
            pixiText.text = pixiText.text + "\n" + this.concatenatedStr;
            pixiText.updateText(true);
        }
        if (this.lineIndex >= fullText.length) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.TerminalOutputTextMG = TerminalOutputTextMG;
TerminalOutputTextMG.counter = 0;
TerminalOutputTextMG.concatenatedStr = "";
TerminalOutputTextMG.lineIndex = 0;
//# sourceMappingURL=TerminalOutputTextMG.js.map
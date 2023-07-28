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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalInputTextMG = exports.TerminalOutputTextMG = exports.computerStartupSound = void 0;
const PIXI = __importStar(require("pixi.js"));
const SOUND = __importStar(require("@pixi/sound"));
const newLineDist = 42; //Distance between everyline on the terminal
const outputSound = SOUND.Sound.from('../assets/Sounds/TerminalOutput.wav'); //For each character output
exports.computerStartupSound = SOUND.Sound.from('../assets/Sounds/ComputerStartUp.wav');
const computerAmbience = SOUND.Sound.from('../assets/Sounds/ComputerAmbienceLoop.wav');
SOUND.sound.add('keySounds', {
    url: '../assets/Sounds/keys.mp3',
    sprites: {
        key1: { start: 1.110, end: 1.277 },
        key2: { start: 1.547, end: 1.737 },
        key3: { start: 3.577, end: 3.730 },
        key4: { start: 5.161, end: 5.358 }
    },
});
SOUND.sound.add('Backspace', {
    url: '../assets/Sounds/backspace.mp3'
});
SOUND.sound.add('Spacebar', {
    url: '../assets/Sounds/spacebar.mp3'
});
SOUND.Sound.from({
    autoPlay: true,
    complete: function () {
    }
});
exports.computerStartupSound.volume = 0.5;
computerAmbience.volume = 0.2;
computerAmbience.loop = true;
//Terminal output text manager
class TerminalOutputTextMG {
    constructor() {
    }
    static resetLineIndexPointer() {
        this.lineIndex = 0;
    }
    static playComputerStartupSound() {
        exports.computerStartupSound.play();
    }
    /*
    public static computerStartupSoundFinished(): boolean {
        if(computerStartupSound.isPlaying == false) {
            return true
        }
    
        return false
    }
    */
    static playComputerAmbience() {
        computerAmbience.play();
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
            if (fullText[this.lineIndex][this.counter] !== " ") {
                outputSound.play();
            }
            this.counter++;
        }
        else {
            //Once the end of line has been reached and is finished processing, don't continue the operations here	
            if (this.lineIndex < fullText.length - 1) {
                this.lineIndex++;
                this.counter = 0;
                this.concatenatedStr = fullText[this.lineIndex];
                //Reset the position of the character hiding rectangle	
                charHidingRec.x = 0;
                charHidingRec.y += newLineDist; //Move the rectangle to a new line		
                pixiText.text = pixiText.text + "\n" + this.concatenatedStr;
                pixiText.updateText(true);
            }
        }
    }
}
exports.TerminalOutputTextMG = TerminalOutputTextMG;
TerminalOutputTextMG.counter = 0;
TerminalOutputTextMG.concatenatedStr = "";
TerminalOutputTextMG.lineIndex = 0;
class Key {
    constructor(value, pixiTextObj) {
        this.downHandler = (e) => {
            if (e.key.toLowerCase() === this.value.toLowerCase()) {
                if (this.isUp && this.press !== undefined) {
                    this.press();
                }
                this.isDown = true;
                this.isUp = false;
                e.preventDefault();
            }
        };
        this.upHandler = (e) => {
            if (e.key.toLowerCase() === this.value.toLowerCase()) {
                if (this.isDown && this.release !== undefined) {
                    this.release();
                }
                if (this.value === "Backspace") {
                    SOUND.sound.play('Backspace');
                }
                for (var i = 65; i <= 90; i++) {
                    const letter = String.fromCharCode(i);
                    if (this.value.toLowerCase() === letter.toLowerCase()) {
                        var rand = this.getRandomNumber(4);
                        console.log(rand);
                        if (rand === 0) {
                            SOUND.sound.play('keySounds', 'key1');
                        }
                        if (rand === 1) {
                            SOUND.sound.play('keySounds', 'key2');
                        }
                        if (rand === 2) {
                            SOUND.sound.play('keySounds', 'key3');
                        }
                        if (rand === 3) {
                            SOUND.sound.play('keySounds', 'key4');
                        }
                    }
                }
                if (this.value == " ") {
                    SOUND.sound.play('Spacebar');
                }
                this.isDown = false;
                this.isUp = true;
                e.preventDefault();
            }
        };
        this.addChar = () => {
            if (this.pixiTextObj.text.length < 42)
                this.pixiTextObj.text += this.value;
        };
        this.removeChar = () => {
            if (this.pixiTextObj.text.length > 1) {
                var tempText = this.pixiTextObj.text.substr(0, this.pixiTextObj.text.length - 1);
                this.pixiTextObj.text = tempText;
            }
        };
        this.getRandomNumber = (max) => {
            return Math.floor(Math.random() * max);
        };
        this.isDown = false;
        this.isUp = true;
        this.value = value;
        this.pixiTextObj = pixiTextObj;
    }
}
class TerminalInputTextMG {
    constructor() { }
}
exports.TerminalInputTextMG = TerminalInputTextMG;
_a = TerminalInputTextMG;
TerminalInputTextMG.counter = 0;
TerminalInputTextMG.keys = [];
TerminalInputTextMG.fillKeysArray = (textObj) => {
    //Allocate keys with alphabets
    for (var i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        _a.keys.push(new Key(letter, textObj));
    }
    _a.keys.push(new Key("Backspace", textObj));
    _a.keys.push(new Key(" ", textObj));
    //Allocate keys with numbers 1-9
    for (var i = 0; i <= 9; i++) {
        _a.keys.push(new Key(i.toString(), textObj));
    }
};
TerminalInputTextMG.attachEventListeners = () => {
    for (var i = 0; i < _a.keys.length; i++) {
        window.addEventListener("keydown", _a.keys[i].downHandler, false);
        window.addEventListener("keyup", _a.keys[i].upHandler, false);
    }
};
TerminalInputTextMG.detachEventListeners = () => {
    for (var i = 0; i < _a.keys.length; i++) {
        window.removeEventListener("keydown", _a.keys[i].downHandler);
        window.removeEventListener("keyup", _a.keys[i].upHandler);
    }
};
TerminalInputTextMG.attachPressAndReleaseFunctions = () => {
    _a.keys.forEach((element) => {
        element.press = () => {
            if (element.value !== "Backspace") {
                element.addChar();
            }
            if (element.value === "Backspace") {
                element.removeChar();
            }
        };
        element.release = () => {
        };
    });
};
TerminalInputTextMG.initializeTerminalInput = (textObj) => {
    _a.fillKeysArray(textObj);
    _a.attachPressAndReleaseFunctions();
    _a.attachEventListeners();
};
//# sourceMappingURL=TerminalTextMG.js.map
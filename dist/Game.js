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
const PIXI = __importStar(require("pixi.js"));
const TerminalTextMG_1 = require("./TerminalTextMG");
var FontFaceObserver = require('fontfaceobserver');
//See if font family exists
var font = new FontFaceObserver('pixelFont');
font.load().then(function () {
    console.log('pixelFont has been loaded');
});
//Default width and height of canvas
const WIDTH = 640;
const HEIGHT = 480;
//Command bar dimensions
const BAR_WIDTH = WIDTH - 64;
const BAR_HEIGHT = 47;
//Window size
const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;
//App settings
const app = new PIXI.Application({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, background: '#001521', resolution: window.devicePixelRatio, antialias: false });
PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.RESOLUTION = 4;
//Scaling
const scaleX = SCREEN_WIDTH / WIDTH;
const scaleY = SCREEN_HEIGHT / HEIGHT;
const scale = Math.min(scaleX, scaleY);
app.stage.scale.set(scale);
const canvas = document.getElementById('pixi-canvas');
if (canvas == null) {
    console.log("Canvas for pixi js is null!");
}
else {
    canvas.appendChild(app.view);
}
var inputBar = new PIXI.Graphics();
inputBar.beginFill('#000000');
inputBar.drawRect(32, HEIGHT - BAR_HEIGHT - 16, BAR_WIDTH, BAR_HEIGHT);
//Terminal text
let terminalOutText = new PIXI.Text("", {
    fontFamily: "pixelFont",
    fontSize: 24,
    fill: '#12FF00FF',
    wordWrap: true,
    wordWrapWidth: 501,
    lineHeight: 42
});
let terminalInText = new PIXI.Text(">", {
    fontFamily: "pixelFont",
    fontSize: 24,
    fill: '#12FF00FF',
    wordWrap: true,
    wordWrapWidth: 501,
    lineHeight: 42
});
let outCharHidingRec = new PIXI.Graphics(); //This rectangle will slowly show the characters of the terminal text one by one for the output
let inCharHidingRec = new PIXI.Graphics(); //This rectangle will slowly show the characters of the terminal text one by one for the input
const textOffsetX = 42;
const textOffsetY = 42;
outCharHidingRec.beginFill('#001521');
outCharHidingRec.drawRect(textOffsetX, textOffsetY, SCREEN_WIDTH, 33);
outCharHidingRec.endFill();
terminalOutText.position.set(textOffsetX, textOffsetY);
terminalInText.position.set(textOffsetX, 420);
//terminalText.text = "Sinosodial OS v1.0. Please wait..." 
const newLineDist = textOffsetY; //Distance between everyline on the terminal
//Terminal text options
terminalOutText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
terminalInText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
terminalOutText.resolution = 8;
terminalInText.resolution = 8;
//Add all the components to the game
app.stage.addChild(terminalOutText);
app.stage.addChild(outCharHidingRec);
app.stage.addChild(inputBar);
app.stage.addChild(terminalInText);
const terminalCharOutputThreshold = 1 / 10; //1/20 seconds
var checkBootSoundFinishedDelay = 33.8;
var elaspedTime = 0;
var elaspedTime2 = 0;
TerminalTextMG_1.TerminalInputTextMG.initializeTerminalInput(terminalInText);
TerminalTextMG_1.TerminalOutputTextMG.playComputerStartupSound();
var finishedPlayingStartupSound = false;
app.ticker.add((delta) => {
    const seconds = delta * 0.01;
    elaspedTime += seconds;
    elaspedTime2 += seconds;
    if (elaspedTime >= terminalCharOutputThreshold) {
        TerminalTextMG_1.TerminalOutputTextMG.updateTerminalText(terminalOutText, "Sinusodial OS V1.0\nLoading firmware...\nLoading drivers...\nDone. You are admin. Please operate responsibly!", outCharHidingRec, terminalOutText.style);
        elaspedTime = 0;
    }
    if (finishedPlayingStartupSound === false) {
        if (elaspedTime2 > checkBootSoundFinishedDelay) {
            checkBootSoundFinishedDelay = 0;
            elaspedTime2 = 0;
            TerminalTextMG_1.TerminalOutputTextMG.playComputerAmbience();
            finishedPlayingStartupSound = true;
        }
    }
});
//# sourceMappingURL=Game.js.map
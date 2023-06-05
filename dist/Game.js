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
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 960;
//App settings
const app = new PIXI.Application({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, background: '#001521', resolution: window.devicePixelRatio, antialias: false });
PIXI.settings.ROUND_PIXELS = true;
//Scaling
const scaleX = SCREEN_WIDTH / WIDTH;
const scaleY = SCREEN_HEIGHT / HEIGHT;
const scale = Math.min(scaleX, scaleY);
const canvas = document.getElementById('pixi-canvas');
if (canvas == null) {
    console.log("Canvas for pixi js is null!");
}
else {
    canvas.appendChild(app.view);
}
var obj = new PIXI.Graphics();
obj.scale.set(scale);
obj.beginFill('#000000');
obj.drawRect(32, HEIGHT - BAR_HEIGHT - 16, BAR_WIDTH, BAR_HEIGHT);
app.stage.addChild(obj);
//Fonts
let text = new PIXI.Text("Testing", {
    fontFamily: "pixelFont",
    fontSize: 24 * scale,
    fill: '#12FF00FF',
});
text.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
app.stage.addChild(text);
app.ticker.add((delta) => {
});
//# sourceMappingURL=Game.js.map
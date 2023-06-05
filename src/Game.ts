import * as PIXI from 'pixi.js';
var FontFaceObserver = require('fontfaceobserver')

//See if font family exists
var font = new FontFaceObserver('pixelFont')
font.load().then(function() {
	
	console.log('pixelFont has been loaded')

})

//Default width and height of canvas
const WIDTH: number = 640
const HEIGHT: number = 480

//Command bar dimensions
const BAR_WIDTH: number = WIDTH - 64
const BAR_HEIGHT: number = 47 

//Window size
const SCREEN_WIDTH: number = 1280
const SCREEN_HEIGHT: number = 960

//App settings
const app = new PIXI.Application<HTMLCanvasElement>({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, background: '#001521', resolution: window.devicePixelRatio, antialias: false })
PIXI.settings.ROUND_PIXELS = true

//Scaling
const scaleX: number = SCREEN_WIDTH/WIDTH
const scaleY: number = SCREEN_HEIGHT/HEIGHT
const scale: number = Math.min(scaleX,scaleY)


const canvas = document.getElementById('pixi-canvas')
if(canvas == null) {
	console.log("Canvas for pixi js is null!")
} else {
	canvas.appendChild(app.view)
}

var obj: PIXI.Graphics = new PIXI.Graphics()
obj.scale.set(scale)
obj.beginFill('#000000')
obj.drawRect(32,HEIGHT-BAR_HEIGHT-16,BAR_WIDTH,BAR_HEIGHT)

app.stage.addChild(obj)

//Fonts
let text: PIXI.Text = new PIXI.Text("Testing", {

	fontFamily: "pixelFont",
	fontSize: 24 * scale,
	fill: '#12FF00FF',

});

text.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST


app.stage.addChild(text)


app.ticker.add((delta) => {

});

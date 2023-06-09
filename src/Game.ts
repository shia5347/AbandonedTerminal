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
const SCREEN_WIDTH: number = 800
const SCREEN_HEIGHT: number = 600

//App settings
const app = new PIXI.Application<HTMLCanvasElement>({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, background: '#001521', resolution: window.devicePixelRatio, antialias: false })
PIXI.settings.ROUND_PIXELS = true
PIXI.settings.RESOLUTION = 4


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

var inputBar: PIXI.Graphics = new PIXI.Graphics()
inputBar.scale.set(scale)
inputBar.beginFill('#000000')
inputBar.drawRect(32,HEIGHT-BAR_HEIGHT-16,BAR_WIDTH,BAR_HEIGHT)

//Terminal text
let terminalText: PIXI.Text = new PIXI.Text("@#: Loading...", {

	fontFamily: "pixelFont",
	fontSize: 24 * scale,
	fill: '#12FF00FF',
	wordWrap: true,
	wordWrapWidth: 42 + (SCREEN_WIDTH-42)

});

let charHidingRec = new PIXI.Graphics() //This rectangle will slowly show the characters of the terminal text one by one

const textOffsetX = 42
const textOffsetY = 42

charHidingRec.beginFill('#001521')
charHidingRec.drawRect(textOffsetX,textOffsetY,SCREEN_WIDTH,32)
charHidingRec.endFill()

terminalText.position.set(textOffsetX,textOffsetY)


var terminalCharIndex: number = 0
const charWidth = PIXI.TextMetrics.measureText("A",terminalText.style).width //Only use this with monospace fonts
const newLineDist: number = textOffsetY //Distance between everyline on the terminal
//Outputs next letter in the sequence of the string.
function updateTerminalText(text: string,pixiText: PIXI.Text): void {
	if(terminalCharIndex < text.length) {
		charHidingRec.x += charWidth
		terminalCharIndex++
	} else {
		
		//Reset the position of the character hiding rectangle	
		//charHidingRec.x = textOffsetX
		//charHidingRec.y += newLineDist //Move the rectangle to a new line		

	}

}

const transparentStyle = new PIXI.TextStyle({
	fill: 'rgba(0,0,0,0)'
})

terminalText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
terminalText.resolution = 8 

//Add all the components to the game
app.stage.addChild(terminalText)
app.stage.addChild(charHidingRec)
app.stage.addChild(inputBar)

const terminalCharOutputThreshold: number = 2 //2 seconds
var elaspedTime = 0

app.ticker.add((delta) => {

	elaspedTime += delta
	if(elaspedTime >= terminalCharOutputThreshold) {
		console.log("2 seconds have passed")

		updateTerminalText("@#: Help! Save me! I am trapped!", terminalText)	
		elaspedTime = 0
	}	



});

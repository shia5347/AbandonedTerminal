import * as PIXI from 'pixi.js';
import { TerminalOutputTextMG, TerminalInputTextMG } from './TerminalTextMG'

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
const SCREEN_WIDTH: number = 1024
const SCREEN_HEIGHT: number = 768

//App settings
const app = new PIXI.Application<HTMLCanvasElement>({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, background: '#001521', resolution: window.devicePixelRatio, antialias: false })

PIXI.settings.ROUND_PIXELS = true
PIXI.settings.RESOLUTION = 4

//Scaling
const scaleX: number = SCREEN_WIDTH/WIDTH
const scaleY: number = SCREEN_HEIGHT/HEIGHT
const scale: number = Math.min(scaleX,scaleY)
app.stage.scale.set(scale)

const canvas = document.getElementById('pixi-canvas')
if(canvas == null) {
	console.log("Canvas for pixi js is null!")
} else {
	canvas.appendChild(app.view)
}

var inputBar: PIXI.Graphics = new PIXI.Graphics()
inputBar.beginFill('#000000')
inputBar.drawRect(32,HEIGHT-BAR_HEIGHT-16,BAR_WIDTH,BAR_HEIGHT)

//Terminal text
let terminalOutText: PIXI.Text = new PIXI.Text("", {

	fontFamily: "pixelFont",
	fontSize: 24,
	fill: '#12FF00FF',
	wordWrap: true,
	wordWrapWidth: 501 ,
	lineHeight: 42 

});

let terminalInText: PIXI.Text = new PIXI.Text(">", {

	fontFamily: "pixelFont",
	fontSize: 24,
	fill: '#12FF00FF',
	wordWrap: true,
	wordWrapWidth: 501 ,
	lineHeight: 42 

});


let outCharHidingRec = new PIXI.Graphics() //This rectangle will slowly show the characters of the terminal text one by one for the output
let inCharHidingRec = new PIXI.Graphics() //This rectangle will slowly show the characters of the terminal text one by one for the input

const textOffsetX = 42
const textOffsetY = 42

outCharHidingRec.beginFill('#001521')
outCharHidingRec.drawRect(textOffsetX,textOffsetY,SCREEN_WIDTH,33)
outCharHidingRec.endFill()

terminalOutText.position.set(textOffsetX,textOffsetY)
terminalInText.position.set(textOffsetX,420)

//terminalText.text = "Sinosodial OS v1.0. Please wait..." 
const newLineDist: number = textOffsetY //Distance between everyline on the terminal

//Terminal text options
terminalOutText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
terminalInText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

terminalOutText.resolution = 8 
terminalInText.resolution = 8 

//Add all the components to the game
app.stage.addChild(terminalOutText)
app.stage.addChild(outCharHidingRec)
app.stage.addChild(inputBar)
app.stage.addChild(terminalInText)

const terminalCharOutputThreshold: number = 1/10 //1/20 seconds
var elaspedTime = 0

TerminalInputTextMG.initializeTerminalInput(terminalInText)


app.ticker.add((delta) => {

	const seconds = delta * 0.01

	elaspedTime += seconds
	if(elaspedTime >= terminalCharOutputThreshold) {
		
		TerminalOutputTextMG.updateTerminalText(terminalOutText,"Hello From Canada! My name is Shahroz and I am the developer of this game! Hopefully I can find a job!" ,outCharHidingRec, terminalOutText.style)	

		elaspedTime = 0
	}	



});

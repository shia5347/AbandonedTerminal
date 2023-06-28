import * as PIXI from 'pixi.js';

const newLineDist: number = 42 //Distance between everyline on the terminal

//Terminal output text manager
export class TerminalOutputTextMG {
private static counter: number = 0
private static concatenatedStr: string = "" 
private static lineIndex: number = 0

private constructor() {

}

public static resetLineIndexPointer(): void {
	this.lineIndex = 0
}

public static updateTerminalText(pixiText: PIXI.Text,text: string,charHidingRec: PIXI.Graphics, textStyle: PIXI.TextStyle): void {

	var currentLines: number = pixiText.height/pixiText.style.lineHeight
	var lineLength: number //Length of current terminal line text
	const fullText:string[] = PIXI.TextMetrics.measureText(text,textStyle).lines
	
	lineLength = fullText[this.lineIndex].length

	if(pixiText.text == "") {
		this.concatenatedStr = fullText[this.lineIndex]
		pixiText.text = this.concatenatedStr
	}
	
	if(this.counter < lineLength) {

		charHidingRec.x += PIXI.TextMetrics.measureText("A",pixiText.style).width //Only works for monospaced fonts
		this.counter++

	} else {
		
		//Once the end of line has been reached and is finished processing, don't continue the operations here	
		if(this.lineIndex < fullText.length-1) {
		this.lineIndex++
		this.counter = 0
		this.concatenatedStr = fullText[this.lineIndex]

		//Reset the position of the character hiding rectangle	
		charHidingRec.x = 0 
		charHidingRec.y += newLineDist //Move the rectangle to a new line		
		pixiText.text = pixiText.text + "\n" + this.concatenatedStr

		pixiText.updateText(true)
		}



	       
	}
}


}

type keyboardPressAndRelease = () => void
class Key {
	value!: string
	isDown: boolean
	isUp: boolean
	press!: undefined | keyboardPressAndRelease
	release!: undefined | keyboardPressAndRelease
	pixiTextObj: PIXI.Text

	constructor(value: string, pixiTextObj: PIXI.Text) {
		this.isDown = false
		this.isUp = true
		this.value = value
		this.pixiTextObj = pixiTextObj
	}

	downHandler = (e: KeyboardEvent): void => {
		if(e.key.toLowerCase() === this.value.toLowerCase()) {
			if(this.isUp && this.press !== undefined) {
				this.press()					
			}

			this.isDown = true
			this.isUp = false
			e.preventDefault()
		}
	}

	upHandler = (e: KeyboardEvent): void => {
		if(e.key.toLowerCase() === this.value.toLowerCase()) {
			if(this.isDown && this.release !== undefined) {
				this.release()	
			}

			this.isDown = false
			this.isUp = true
			e.preventDefault()
		}	
	}
	
	addChar = (): void => {
		if(this.pixiTextObj.text.length < 42)
			this.pixiTextObj.text += this.value
	}

	removeChar = (): void => {
		if(this.pixiTextObj.text.length > 1) {
		var tempText:string = this.pixiTextObj.text.substr(0,this.pixiTextObj.text.length-1)
		this.pixiTextObj.text = tempText
		}

	}

}

export class TerminalInputTextMG {
	
	private static counter: number = 0
	private constructor() {}	

	static keys: Key[] = []
	static fillKeysArray = (textObj: PIXI.Text): void => {
		//Allocate keys with alphabets
		for(var i = 65; i <= 90; i++) {
			const letter = String.fromCharCode(i)				
			this.keys.push(new Key(letter,textObj))
		}

		this.keys.push(new Key("Backspace",textObj))
		this.keys.push(new Key(" ",textObj))
		
		//Allocate keys with numbers 1-9
		for(var i = 0; i <= 9; i++) {
			this.keys.push(new Key(i.toString(),textObj))
		}
	}
	
	static attachEventListeners = (): void => {
		for(var i = 0; i < this.keys.length; i++)  {
			window.addEventListener("keydown",this.keys[i].downHandler,false)
			window.addEventListener("keyup",this.keys[i].upHandler,false)
		}
	}	

	static detachEventListeners = (): void => {
		for(var i = 0; i < this.keys.length; i++) {
			window.removeEventListener("keydown",this.keys[i].downHandler)
			window.removeEventListener("keyup",this.keys[i].upHandler)
		}
	}

	static attachPressAndReleaseFunctions = (): void => {
		this.keys.forEach((element) => {
			element.press = (): void => {

				if(element.value !== "Backspace") {
				element.addChar()
				}
				if(element.value === "Backspace") {
					element.removeChar()
				}
			}

			element.release = (): void => {
			}
		})
	}

	static initializeTerminalInput = (textObj: PIXI.Text): void => {
		this.fillKeysArray(textObj)
		this.attachPressAndReleaseFunctions()
		this.attachEventListeners()	
	}


}


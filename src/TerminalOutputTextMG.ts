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

public static updateTerminalText(pixiText: PIXI.Text,text: string,charHidingRec: PIXI.Graphics, textStyle: PIXI.TextStyle): boolean {

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
			
		this.lineIndex++
		this.concatenatedStr = fullText[this.lineIndex]

		this.counter = 0
		//Reset the position of the character hiding rectangle	
		charHidingRec.x = 0 
		charHidingRec.y += newLineDist //Move the rectangle to a new line		
		pixiText.text = pixiText.text + "\n" + this.concatenatedStr

		pixiText.updateText(true)
	       
	}

	if(this.lineIndex >= fullText.length) {
		return true
	} else {
		return false
	}
}


}





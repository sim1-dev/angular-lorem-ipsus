import { Component, OnInit } from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  generatedText: string = ''
  vowels: string[] = ["a", "e", "i", "o", "u"]
  whitelist: string[] = ["lorem"]
  susDictionary: string[] = ["morbius", "amorgus", "amogus", "sus", "Walter Whitus", "asus"]

  constructor() { }

  ngOnInit(): void {
    console.log(this.generateText())
  }

  generateText(): string {
    let text: string, words: string[], endsWithDot: boolean = false
    text = loremIpsum({
      count: 1,                // Number of "words", "sentences", or "paragraphs"
      format: "plain",         // "plain" or "html"
      paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
      paragraphUpperBound: 7,  // Max. number of sentences per paragarph.
      random: Math.random,     // A PRNG function
      sentenceLowerBound: 5,   // Min. number of words per sentence.
      sentenceUpperBound: 15,  // Max. number of words per sentence.
      suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
      units: "paragraphs",     // paragraph(s), "sentence(s)", or "word(s)"
    })
    words = text.split(" ")
    words.forEach((word, i) => {

      //not in whitelist
      if(!this.whitelist.some(whitelistedWords => word.toLowerCase().endsWith(whitelistedWords))) {

        //temporarly remove dot
        if(word.toLowerCase().endsWith(".")) {
          endsWithDot = true
          words[i] = word.replace(".", "")
        }

        //avoid double words
        if(word.toLowerCase() === words[i - 1]?.toLowerCase())
          words[i - 1] = this.susDictionary[Math.floor(Math.random()*this.susDictionary.length)]

        //logic
        if(this.vowels.some(letters => word.toLowerCase().endsWith(letters))) {
          words[i] += "s"
        } else if(word.endsWith("m")) {
          words[i] = word.replace("m", "s")
        } else {
          words[i] += "us"
        }

        //restore dot
        if(endsWithDot) {
          words[i] += "."
          endsWithDot = false
        }
        
      }
    })
    text = words.join(" ")
    this.generatedText = text
    console.log(this.generatedText)
    return this.generatedText
  }

}

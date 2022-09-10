import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  @ViewChild("autosize") autosize: { resizeToFitContent: (arg0: boolean) => void; };

  generatedText: string = ''
  lorem: LoremIpsum = new LoremIpsum({
    sentencesPerParagraph: {
      min: 4,
      max: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  })
  vowels: string[] = ["a", "e", "i", "o", "u"]
  whitelist: string[] = ["lorem"]
  susDictionary: string[] = ["morbius", "amorgus", "amogus", "sus", "Walter Whitus", "asus", "bus", "ravenous", "chungus", "discuss", "emus", "fungus", "genius", "hippopotamus", "cactus", "lexus", "mangus", "ogus", "pegasus", "rhombus", "usus", "wigasus", "Zeus", "magus", "ogamus", "Obamasus", "excursus", "colossus", "versus", "lapsus", "tarsus", "abomasus", "zamasus", "hypothalamus", "sarcophagus", "tremendous", "prospectus", "voluptuous", "homunculus", "abdicatus", "acerrimus", "aegyptius", "ferrarius", "generatus", "genericus", "iaculatus", "oratorius", "percussus", "spartacus", "bingus"]
  numberOfParagraphs: number = 4
  susLevel: number = 1

  constructor() { }

  ngOnInit(): void {
    this.lorem.generator.words = this.lorem.generator.words.concat(this.susDictionary)
    //console.log(this.lorem)
    this.generateText()
  }

  generateText(): string {
    let text: string, words: string[], endsWithDot: boolean = false, finalWhitelist: string[], originalWordlist: string[], susLeveledWordlist: string[]
    originalWordlist = this.lorem.generator.words
    susLeveledWordlist = originalWordlist
    finalWhitelist = this.whitelist.concat(this.susDictionary).map(word => word.toLowerCase())
    for(let i = 1; i < this.susLevel; i++) {
      susLeveledWordlist = susLeveledWordlist.concat(this.susDictionary)
    }
    this.lorem.generator.words = susLeveledWordlist
    text = this.lorem.generateParagraphs(this.numberOfParagraphs)
    words = text.split(" ")
    words.forEach((word, i) => {
      //not in whitelist
      if(!finalWhitelist.some(whitelistedWord => word.toLowerCase() === whitelistedWord.toLowerCase()) && word.toLowerCase() !== "walter" && word.toLowerCase() !== "whitus") {

        //temporarly remove dot
        if(words[i].toLowerCase().endsWith(".")) {
          endsWithDot = true
          words[i] = word.replace(".", "")
        }

        //avoid double words
        if(words[i].toLowerCase() === words[i - 1]?.toLowerCase()) {
          // console.log(words[i - 1], "duplicate word of "+word)
          // console.log("to be replaced with: "+this.susDictionary[Math.floor(Math.random()*this.susDictionary.length)])
          words[i] = this.susDictionary[Math.floor(Math.random()*this.susDictionary.length)]
        }

        //logic
        if(!finalWhitelist.includes(words[i].toLowerCase().replace(/\./g, ''))) {
          if(this.vowels.some(letters => words[i].toLowerCase().endsWith(letters.toLowerCase())) ) {
            words[i] += "s"
          } else if(words[i].endsWith("m")) {
            words[i] = words[i].replace("m", "s")
          } else {
            words[i] += "us"
          }
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
    this.lorem.generator.words = originalWordlist
    return this.generatedText
  }

}

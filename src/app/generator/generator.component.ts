import { CdkTextareaAutosize } from '@angular/cdk/text-field/autosize';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';
import { ToasterService } from '../services/toaster.service';

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
  susDictionary: string[] = ["morbius", "amorgus", "amogus", "sus", "Walter Whitus", "asus", "bus", "chungus", "wigasus", "Zeus", "ogamus", "Obamasus", "abomasus", "zamasus", "sarcophagus", "bingus", "tiramisus", "Jesus", "cactus"]
  extraDictionary: string[] = ["ravenous", "discuss", "emus", "fungus", "genius", "hippopotamus", "lexus", "mangus", "ogus", "pegasus", "rhombus", "usus", "magus", "excursus", "colossus", "versus", "lapsus", "tarsus", "hypothalamus", "tremendous", "prospectus", "voluptuous", "homunculus", "abdicatus", "acerrimus", "aegyptius", "ferrarius", "generatus", "genericus", "iaculatus", "oratorius", "percussus", "spartacus", "consensus", "colossus", "discursus", "excursus", "lapsus", "Crassus", "casus"]
  numberOfParagraphs: number = 4
  susLevel: number = 1

  constructor(public toasterService: ToasterService) { }

  ngOnInit(): void {
    this.lorem.generator.words = this.lorem.generator.words.concat(this.susDictionary)
    //console.log(this.lorem)
    this.generateText()
  }

  generateText(): string {
    let text: string, words: string[], endsWithDot: boolean = false, finalWhitelist: string[], originalWordlist: string[], susLeveledWordlist: string[]
    originalWordlist = this.lorem.generator.words.concat(this.extraDictionary)
    susLeveledWordlist = originalWordlist
    finalWhitelist = this.whitelist.concat(this.susDictionary).concat(this.extraDictionary).map(word => word.toLowerCase())
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
        
        console.log(words[i].toLowerCase(), words[i-1]?.toLowerCase())

        //avoid double words
        if(words[i - 1]?.toLowerCase().includes(words[i].toLowerCase())) {
          words[i] = this.susDictionary[Math.floor(Math.random()*this.susDictionary.length)]
        }

        //logic
        if(!finalWhitelist.map(whitelistedWord => whitelistedWord.toLowerCase()).includes(words[i].toLowerCase().replace(/\./g, ''))) {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HeroComponent implements OnInit {

  imagesCount = 12
  images: string[] = []

  paused = false
  unpauseOnArrow = false
  pauseOnIndicator = false
  pauseOnHover = false
  pauseOnFocus = false

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    config.interval = 4000
    config.keyboard = false
    config.pauseOnHover = false
    for( let i = 1; i < this.imagesCount + 1; i++) {
      this.images.push("/assets/images/amogus"+i+".jpg")
    }
  }

  ngOnInit(): void {
    
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused()
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused()
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle()
    } else {
      this.carousel.pause()
    }
    this.paused = !this.paused
  }


}

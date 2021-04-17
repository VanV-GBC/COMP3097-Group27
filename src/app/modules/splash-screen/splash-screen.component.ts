import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  public opacityChange = 1;
  public splashTransition;
  showSplash = true;
  readonly ANIMATION_DURATION = 0.5;

  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = false;
    }, 1000);
  }

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.hideSplashAnimation();
    }, 5000);
  }
}

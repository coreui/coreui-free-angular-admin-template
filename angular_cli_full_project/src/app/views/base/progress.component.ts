import {Component, OnDestroy} from '@angular/core';

@Component({
  templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnDestroy {

  max: number = 200;
  showWarning: boolean;
  dynamic: number;
  type: string;

  constructor() {
    this.random();
    this.randomStacked()
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    // console.log(`onDestroy`, this.timer);
  }

  random(): void {
    let value = Math.floor(Math.random() * 100 + 1);
    let type: string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = type === 'danger' || type === 'warning';
    this.dynamic = value;
    this.type = type;

  }

  stacked: any[] = [];

  randomStacked(): void {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let n = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * 4);
      let value = Math.floor(Math.random() * 27 + 3);
      this.stacked.push({
        value,
        type: types[index],
        label: value + ' %'
      });
    }
  }

  timer: any = null;
  buttonCaption: string = 'Start';

  randomize(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.timer = setInterval(() => this.randomStacked(), 2000);
    }
    this.buttonCaption = this.timer ? 'Stop' : 'Start';
  }
}

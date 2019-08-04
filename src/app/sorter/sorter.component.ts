import { Component, OnInit } from '@angular/core';
import bubbleSort from './sorter.helpers';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  private loading = false;
  private array50k: Array<number> = [];
  private elapsedTime: number;
  private description: string;
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 50000; i++) {
      this.array50k.push(Math.ceil(Math.random() * 1000));
    }
  }

  sortWithoutWorker() {
    this.loading = true;
    const startDate = new Date().getTime();
    bubbleSort([...this.array50k]);
    this.loading = false;
    this.elapsedTime = (new Date().getTime() - startDate) / 1000;
    this.description = 'Sorted without web worker, so we didn\'t see animated progress bar.';
  }

  sortWithWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.loading = true;
      const startDate = new Date().getTime();
      const worker = new Worker('./sorter.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this.loading = false;
        this.elapsedTime = (new Date().getTime() - startDate) / 1000;
        this.description = 'Sorted with web worker, so we saw animated progress bar.\n';
      };
      worker.postMessage([...this.array50k]);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}

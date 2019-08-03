import {AfterViewInit, Component, Directive, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MzButtonModule } from 'ngx-materialize';

@Component({
  selector: 'app-painter',
  templateUrl: './painter.component.html',
  styleUrls: ['./painter.component.scss']
})
export class PainterComponent implements AfterViewInit {

  @ViewChild('painter', {static: false}) canvasRef: ElementRef;
  private canvasObject: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  private rectangles: Array<any> = [];
  private draggingIndex = -1;
  private startPosition: {x: number, y: number} = {x: 0, y: 0};
  private canvasOffset: {left: number, top: number};
  constructor() { }

  draw() {
    this.context.clearRect(0, 0, this.canvasObject.width, this.canvasObject.height);
    this.rectangles.forEach(rect => {
      this.context.fillRect(rect.x, rect.y, rect.w, rect.h);
    });
  }

  ngAfterViewInit(): void {
    this.canvasObject = this.canvasRef.nativeElement;
    this.canvasOffset = {
      left: this.canvasObject.getBoundingClientRect().left,
      top: this.canvasObject.getBoundingClientRect().top
    };

    this.context = this.canvasObject.getContext('2d');
    this.canvasObject.onmousedown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const xCoord = event.clientX - this.canvasOffset.left;
      const yCoord = event.clientY - this.canvasOffset.top;
      console.log(`Mouse down event ${xCoord}, ${yCoord}`);
      this.draggingIndex = this.rectangles
        .findIndex(r => r.x <= xCoord && r.x + r.w >= xCoord && r.y <= yCoord && r.y + r.h >= yCoord);
      if (this.draggingIndex !== -1) {
        console.log('find rectangle');
        this.rectangles[this.draggingIndex].isDragging = true;
        this.startPosition.x = xCoord;
        this.startPosition.y = yCoord;
      }
    };

    this.canvasObject.onmousemove = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.draggingIndex !== -1) {
        const xCoord = event.clientX - this.canvasOffset.left;
        const yCoord = event.clientY - this.canvasOffset.top;
        this.rectangles[this.draggingIndex].x += (xCoord - this.startPosition.x);
        this.rectangles[this.draggingIndex].y += (yCoord - this.startPosition.y);
        this.startPosition = {x: xCoord, y: yCoord};
        this.draw();
      }
    };

    this.canvasObject.onmouseup = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.draggingIndex = -1;
      this.draw();
    };
  }
  addRectangle() {
    console.log('adding rectangle');
    this.rectangles.push({x: 2, y: 0, w: 20, h: 20, isDragging: false});
    this.rectangles.push({x: 220, y: 110, w: 20, h: 20, isDragging: false});
    this.draw();
  }

}

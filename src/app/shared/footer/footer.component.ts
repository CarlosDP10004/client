import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  constructor() { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy');
  }

}

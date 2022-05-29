import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SettingsService } from 'src/app/core/http/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  Texto: string;

  constructor(
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.settingService.getHome().subscribe(data => {
      this.Texto = data['ValorCadena'];
    });
  }

}

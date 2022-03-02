import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  
  constructor() { }

  ngOnInit(): void {
  }

  updateSource($event: Event) {  
    this.projectImage($event.target['files'][0]);
}  
origen:string = '';
projectImage(file: File) {
    let reader = new FileReader;      
    reader.onload = (e: any) => {          
        this.origen = e.target.result;
        this.onChange.emit(file);
    };      
    reader.readAsDataURL(file);
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { SettingsService } from 'src/app/core/http/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  origen:string = '';
  data: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private settingService: SettingsService,
    private attachmentService: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.settingService.getLogo().subscribe(data => {
      this.data = data;      
      this.origen = this.attachmentService.getPathImage(this.data.Ubicacion);
    });
  }


  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

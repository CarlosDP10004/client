import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/core/http/roles.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles:any;
  constructor(
    private rolService: RolesService
  ) { }

  ngOnInit(): void {
    this.rolService.showAll().subscribe(data =>{
      console.log(data);
      this.roles= data;
    });
  }

}

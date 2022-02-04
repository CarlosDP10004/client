import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/http/user.service';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:any;
  bsModalRef: BsModalRef;
  constructor(
    private userService: UserService,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.userService.showAll().subscribe(data =>{
      console.log(data);
      this.users= data;
    });
  }

  displayStyle = "none";
  
  open() {
    this.displayStyle = "block";
    //this.modal.open();
  }

  close() {
    this.displayStyle = "none";
  }


  addUser() {
    this.bsModalRef = this.bsModalService.show(UserAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.ngOnInit();
      }
    });
  }


  editUser(){

  }

}

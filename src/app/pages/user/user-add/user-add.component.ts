import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RolesService } from 'src/app/core/http/roles.service';
import { UserService } from 'src/app/core/http/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  addNewPostForm: FormGroup;
  roles: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private builder: FormBuilder, 
    private userService: UserService, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef
  ) {
      this.addNewPostForm = this.builder.group({      
      NombreUsuario: new FormControl('', []),
      Contrasenna: new FormControl('', []),
      Roles: new FormControl(null, [])
    });

    this.rolService.showAll().subscribe(data => {
      Object.assign(this.roles, data);
    }, error => { console.log('Error al obtener datos.'); });
   }

  ngOnInit(): void {
  }

  guardarUsuario(){
    let postData = {
      'NombreUsuario': this.addNewPostForm.get('NombreUsuario').value,
      'Contrasenna': this.addNewPostForm.get('Contrasenna').value,
      'Roles': this.addNewPostForm.get('Roles').value,
    };
  
    this.userService.addUser(postData).subscribe(data=>{
      console.log(data);
      if(data!=null && data>0){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}

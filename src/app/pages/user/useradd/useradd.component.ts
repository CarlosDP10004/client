import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from 'src/app/core/http/roles.service';
import { UserService } from 'src/app/core/http/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {
  addUser: FormGroup;
  roles: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private builder: FormBuilder, 
    private userService: UserService, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) { 
    this.addUser = this.builder.group({      
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
      'NombreUsuario': this.addUser.get('NombreUsuario').value,
      'Contrasenna': this.addUser.get('Contrasenna').value,
      'Roles': this.addUser.get('Roles').value,
    };
    this.userService.addUser(postData).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();
      }
    });


  /*
    this.userService.addUser(postData).subscribe(data=>{
      console.log(data);
      if(data!=null && data>0){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });*/
  }

  onClose(){
    this.bsModalRef.hide();
  }

}

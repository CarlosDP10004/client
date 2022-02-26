import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { RolesService } from 'src/app/core/http/roles.service';
import { UserService } from 'src/app/core/http/user.service';
import Swal from 'sweetalert2';

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
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { 
    this.addUser = this.builder.group({      
      NombreUsuario: new FormControl('', []),
      Contrasenna: new FormControl('', []),
      Roles: new FormControl(null, [])
    });

    this.rolService.showAll().subscribe(data => {
      Object.assign(this.roles, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
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
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

/*
  getErrorMessage(error){
    return typeof error.message === 'string' || error.message instanceof String
        ? error.message
        : this.getValidations(error.message);
  }

  getValidations(message){
    var messageString = "";
    var properties = Object.getOwnPropertyNames(message);
    for (let i = 0; i < properties.length; i++)
    {
        let currentProperty = properties[i];
        //messageString += currentProperty + ": " + message[currentProperty][0];
        messageString += `\n` + message[currentProperty][0];
    }
    return messageString;
}*/

  onClose(){
    this.bsModalRef.hide();
  }

}

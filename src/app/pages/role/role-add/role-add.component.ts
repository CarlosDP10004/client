import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { RolesService } from 'src/app/core/http/roles.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  addRol: FormGroup;
  permisos: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private builder: FormBuilder, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
      this.addRol = this.builder.group({      
      NombreRol: new FormControl('', []),
      Permisos: new FormControl(null, [])
    });

    this.rolService.getPermisos().subscribe(data => {
      Object.assign(this.permisos, data);
    }, error => { console.log('Error al obtener datos.'); });
   }

  ngOnInit(): void {
  }

  guardarRol(){
    let postData = {
      'NombreRol': this.addRol.get('NombreRol').value,      
      'Permisos': this.addRol.get('Permisos').value,
    };
    this.rolService.addRole(postData).subscribe(data=>{
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

  onClose(){
    this.bsModalRef.hide();
  }

}

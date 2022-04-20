import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/http/error.service';
import { RolesService } from 'src/app/core/http/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  editRol: FormGroup;
  permisos: any[] = [];
  rolPermisos: any[] = [];
  seleccion: any;
  event: EventEmitter<any>=new EventEmitter();
  id: number;
  roleData: any;

  constructor(
    private builder: FormBuilder, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { 
    this.editRol = this.builder.group({      
      NombreRol: new FormControl('', []),
      Permisos: new FormControl(this.builder.array([]))
    });

    this.rolService.getPermisos().subscribe(data => {
      Object.assign(this.permisos, data);
    }, error => { console.log('Error al obtener datos.'); });

    

    this.rolService.IdRol.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.rolService.getRol(this.id).subscribe(data => {
          this.roleData = data;
          

          this.rolService.getPermisosByRol(this.id).subscribe(data => {
            Object.assign(this.rolPermisos, data);
          }, error => { console.log('Error al obtener datos.'); });

          if (this.editRol!=null && this.roleData!=null) {
            this.editRol.controls['Permisos'].setValue(this.rolPermisos);
            this.editRol.controls['NombreRol'].setValue(this.roleData.name);
          }
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
    });
  }

  ngOnInit(): void {
  }

  editarRol(){
    let role = {
      'NombreRol': this.editRol.get('NombreRol').value,
      'Permisos': this.editRol.get('Permisos').value,
    };

    this.rolService.editRole(this.id, role).subscribe(data => {      
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();      
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}

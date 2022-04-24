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
  permisosByRol: any[] = [];
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
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){ 
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
        this.rolService.getRol(this.id).subscribe(async data => {
          this.roleData = data;
          if (this.editRol!=null && this.roleData!=null) {
            this.permisosByRol = await this.getIds(this.id);
            this.editRol.controls['Permisos'].setValue(this.permisosByRol);
            this.editRol.controls['NombreRol'].setValue(this.roleData.name);
          }
        }, error => { 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: this.errorService.getErrorMessage(error.error),
            confirmButtonColor: '#c9a892',
            confirmButtonText: 'Aceptar'
          }) 
        });
      }
    });
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

  getIds(idRol): any{ 
    return new Promise((resolved, reject) => {
      this.rolService.getPermisosByRol(idRol).subscribe(data => {
        resolved(data);
      }, error => { 
        reject(error);
        console.log('Error al obtener datos.'); });      
    }); 
  }

  onClose(){
    this.bsModalRef.hide();
  }

}

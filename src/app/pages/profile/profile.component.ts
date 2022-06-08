import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

  profileForm: FormGroup;
  user: any;

  Nombre: string;
  
  constructor(
    private builder: FormBuilder,
    private errorService: ErrorService,
    private authService: AuthService
  ) { 
    this.profileForm = this.builder.group({
      empleado: new FormControl('', []),
      nombrePlazaNominal: new FormControl('', []),
      nombreUnidad: new FormControl('', []),
      nombrePlaza: new FormControl('', []),
      nombreEstadoLaboral: new FormControl('', [])
    });

    this.authService.me().subscribe(data => {

      let profileData = data;
        if (this.profileForm!=null && data!=null) {
          this.profileForm.controls['empleado'].setValue(profileData['givenname']);
          this.profileForm.controls['nombrePlazaNominal'].setValue(profileData['sn']);
          this.profileForm.controls['nombreUnidad'].setValue(profileData['userprincipalname']);
          this.profileForm.controls['nombrePlaza'].setValue(data[0]['nombrePlaza']);
          this.profileForm.controls['nombreEstadoLaboral'].setValue(data[0]['nombreEstadoLaboral']);
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

  ngOnInit(): void {
  }


profile(){
  this.authService.me().subscribe(data => {
    this.authService.profile(data).subscribe(profile => {
      Object.assign(this.user, profile);
    },err => {
      console.log(err);
    });
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

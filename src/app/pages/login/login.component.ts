import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { SettingsService } from 'src/app/core/http/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  origen:string = '';
  loginData: any;

  public form:FormGroup;
  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private userService: AuthService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private settingService: SettingsService,
    private attachmentService: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.form = this.formBuilder.group({
      NombreUsuario:['',[Validators.required]],
      Contrasenna:['',[Validators.required]]
    });
    this.settingService.getLogo().subscribe(data => {
      this.loginData = data;      
      this.origen = this.attachmentService.getPathImage(this.loginData.Ubicacion);
    });
  }

  onSubmit(){
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    }
    this.userService.login(this.form.value).subscribe( data => {     
      this.router.navigate(['/Assets']);     
    }, (error)=>{   
      this.toastr.error(error);
    });
  }


  get Username():AbstractControl{return this.form.get('NombreUsuario');}
  get Password():AbstractControl{return this.form.get('Contrasenna');}


}

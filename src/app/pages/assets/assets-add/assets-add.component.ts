import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assets-add',
  templateUrl: './assets-add.component.html',
  styleUrls: ['./assets-add.component.scss']
})
export class AssetsAddComponent implements OnInit {
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  addAsset:FormGroup;
  accounts: any[] = [];
  providers: any[] = [];
  origens: any[] = [];
  clasifications: any[] = [];
  selected: number;
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private formBuilder:FormBuilder,     
    private toastr: ToastrService,
    private router:Router,
    private assetService: AssetsService,
    private accountService: AccountService,
    private providerService: ProviderService,
    private clasificationService: ClasificationService,
    private errorService: ErrorService
  ) { }

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

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.addAsset = this.formBuilder.group({
      IdCuenta:['',[Validators.required]],
      IdClasificacion:['',[Validators.required]],
      Marca:['',[Validators.required]],
      Modelo:['',[Validators.required]],
      Descripcion:['',[Validators.required]],
      IdOrigen:['',[Validators.required]],
      ValorCompra:['',[Validators.required]],
      FechaCompra:['',[Validators.required]],
      DocumentoCompra:['',[Validators.required]],
      Serie:['',[Validators.required]],
      IdProveedor:['',[Validators.required]],
      LibreGestion:['',[Validators.required]],
      Fotografia:['',[Validators.required]]
    });

    this.accountService.showAll().subscribe(data => {
      Object.assign(this.accounts, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.assetService.getOrigen().subscribe(data => {
      Object.assign(this.origens, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.providerService.showAll().subscribe(data => {
      Object.assign(this.providers, data);
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

  guardarActivo(){
    let postData = {
      'IdCuenta': this.addAsset.get('IdCuenta').value,
      'IdClasificacion': this.addAsset.get('IdClasificacion').value,
      'Marca': this.addAsset.get('Marca').value,
      'Modelo': this.addAsset.get('Modelo').value,
      'Descripcion': this.addAsset.get('Descripcion').value,
      'IdOrigen': this.addAsset.get('IdOrigen').value,
      'ValorCompra': this.addAsset.get('ValorCompra').value,
      'FechaCompra': this.addAsset.get('FechaCompra').value,
      'DocumentoCompra': this.addAsset.get('DocumentoCompra').value,
      'Serie': this.addAsset.get('Serie').value,
      'IdProveedor': this.addAsset.get('IdProveedor').value,
      'LibreGestion': this.addAsset.get('LibreGestion').value,
      'Fotografia': this.addAsset.get('Fotografia').value
    };
    console.log(postData);

    this.assetService.addAsset(postData).subscribe(data=>{
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Supplies']);
      }
    }, (error)=>{
      this.toastr.error(error.error.message.toString());
    });
  }  

  chargeClasification(value){
    this.clasifications = [];
    this.clasificationService.getClasificacionByAccount(value).subscribe(data => {
      Object.assign(this.clasifications, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        //text: error,
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }
  
}

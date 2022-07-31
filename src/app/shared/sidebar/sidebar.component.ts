import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import { PermissionModel } from 'src/app/models/permission';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  origen:string = '';
  data: any;
  permissions: any[] = [];

  app: any;


  asset: boolean;
  registerAsset: boolean;
  assignmentAsset: boolean;
  dischargeAsset: boolean;
  departureAsset: boolean;
  extLoanAsset: boolean;
  intLoanAsset: boolean;
  readmision: boolean;
  report: boolean;
  reportGeneral: boolean;
  reportDepreciation: boolean;
  reportAmortization: boolean;
  reportUnits: boolean;
  reportStatus: boolean;
  reportHistorical: boolean;
  catalogue: boolean;
  account: boolean;
  clasification: boolean;
  departament: boolean;
  workStation: boolean;
  brand: boolean;
  provider: boolean;
  segurity: boolean;
  user: boolean;
  role: boolean;
  setting: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private settingService: SettingsService,
    private attachmentService: AttachmentService,
  ) { }

  ngOnInit(): void {
    this.settingService.getLogo().subscribe(data => {
      this.data = data;      
      this.origen = this.attachmentService.getPathImage(this.data.Ubicacion);
    });
    this.getPermissions();
  }


  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      this.app = await aux.setPermission(data);
      await this.setApp(this.app);
    }, error =>{
      console.log(error);
    });
  }

  setApp(app: any){
    this.asset = app.asset;
    this.registerAsset = app.registerAsset;
    this.assignmentAsset = app.assignmentAsset;
    this.dischargeAsset = app.dischargeAsset;
    this.departureAsset = app.departureAsset;
    this.extLoanAsset = app.extLoanAsset;
    this.intLoanAsset = app.intLoanAsset;
    this.readmision = app.readmision;
    this.report = app.report;
    this.reportGeneral = app.reportGeneral;
    this.reportDepreciation = app.reportDepreciation;
    this.reportAmortization = app.reportAmortization;
    this.reportUnits = app.reportUnits;
    this.reportStatus = app.reportStatus;
    this.reportHistorical = app.reportHistorical;
    this.catalogue = app.catalogue;
    this.account = app.account;
    this.clasification = app.clasification;
    this.departament = app.departament;
    this.workStation = app.workStation;
    this.brand = app.brand;
    this.provider = app.provider;
    this.segurity = app.segurity;
    this.user = app.user;
    this.role = app.role;
    this.setting = app.setting;
  }


}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { SettingsListComponent } from './settings-list/settings-list.component';

const routes: Routes = [
  {
    path: "", 
    component: SettingsListComponent
  },
  {
    path: "Edit/:id", 
    component: SettingsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

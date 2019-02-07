import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElectronService } from 'ngx-electron';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccountConfigurationComponent } from './account-configuration/account-configuration.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { ContentDirective } from './content-directive';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { StateManagementService } from './state-management.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AccountConfigurationComponent,
    TransactionsComponent,
    ContentLoaderComponent,
    ContentDirective,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    StateManagementService,
    ElectronService
  ],
  entryComponents: [
    SettingsComponent,
    AccountConfigurationComponent,
    TransactionsComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

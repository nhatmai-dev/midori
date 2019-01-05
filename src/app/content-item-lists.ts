import { ContentItem } from './content-item';
import { SettingsComponent } from './settings/settings.component';
import { AccountConfigurationComponent } from './account-configuration/account-configuration.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AboutComponent } from './about/about.component';

export const CONTENT_ITEMS: ContentItem[] = [
    {codename: 'sttn', name: 'Settings', icon: 'settings', component: SettingsComponent},
    {codename: 'accncnfg', name: 'Account configuration', icon: 'account_box', component: AccountConfigurationComponent},
    {codename: 'trns', name: 'Transactions', icon: 'search', component: TransactionsComponent},
    {codename: 'abt', name: 'About', icon: 'info', component: AboutComponent}
];

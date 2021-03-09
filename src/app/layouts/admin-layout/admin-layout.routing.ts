import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VentasListComponent } from 'app/ventas-list/ventas-list.component';
import { VentasSummaryComponent } from 'app/ventas-summary/ventas-summary.component';
import { VentasResultComponent } from 'app/ventas-result/ventas-result.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'mapa/:latitude/:longitude', component: MapsComponent },
    { path: 'ventas-list', component: VentasListComponent },
    { path: 'ventas-summary', component: VentasSummaryComponent},
    { path: 'ventas-result', component: VentasResultComponent}
];

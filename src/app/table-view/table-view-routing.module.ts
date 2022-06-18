import { RouterModule, Routes } from '@angular/router';
import { TableViewComponent } from './table-view.component';


const tableViewRoutes: Routes = [
    {
        path: '',
        component: TableViewComponent
    }
];

export const TableViewRoutingModule = RouterModule.forChild(tableViewRoutes);

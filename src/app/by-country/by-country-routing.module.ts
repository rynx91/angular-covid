import { RouterModule, Routes } from '@angular/router';
import { ByCountryComponent } from './by-country.component';

const byCountryRoutes: Routes = [
    {
        path: '',
        component: ByCountryComponent
    },
    {
        path: ':country',
        component: ByCountryComponent
    }
];

export const ByCountryRoutesModule = RouterModule.forChild(byCountryRoutes);

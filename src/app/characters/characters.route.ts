import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersAppComponent } from './characters.app.component';
import { ListComponent } from './list/list.component';


const charactersRouterConfig: Routes = [
    {
        path: '', component: CharactersAppComponent,
        children: [
            { path: 'list', component: ListComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(charactersRouterConfig)
    ],
    exports: [RouterModule]
})
export class CharactersRoutingModule { }

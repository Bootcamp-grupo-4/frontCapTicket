import { Routes } from '@angular/router';
import { ListEventosComponent } from './components/list-eventos/list-eventos.component';
import { AddEventoComponent } from './components/add-evento/add-evento.component';
import { EditEventosComponent } from './components/edit-eventos/edit-eventos.component';
import { CompraComponent } from './components/compra/compra.component';

export const routes: Routes = [
    { path: 'list', component: ListEventosComponent },
    { path: 'add', component: AddEventoComponent },
    { path: 'edit/:id', component: EditEventosComponent },
    { path: 'compra/:id', component: CompraComponent }

];

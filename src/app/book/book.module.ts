import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesGuard } from '../shared/providers/pages-guard';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    canActivate: [PagesGuard],
    children: [
      {
        path: 'create',
        component: CreateBookComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [CreateBookComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class BookModule {}

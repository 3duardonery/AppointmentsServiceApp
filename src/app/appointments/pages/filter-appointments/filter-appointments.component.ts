import { Component, OnInit } from '@angular/core';
import { AvailableHour, Book } from 'src/app/shared/models/books';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-filter-appointments',
  templateUrl: './filter-appointments.component.html',
  styleUrls: ['./filter-appointments.component.css'],
})
export class FilterAppointmentsComponent implements OnInit {
  availableBooks: Book[] = [];
  availableHours: AvailableHour[] = [];
  fixedAvailableHours: AvailableHour[] = [];
  isHiddeCancelled: boolean = false;
  selectedBook: Book = {
    date: '',
  };
  loading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAvailbleBooksByProfessional();
  }

  hideCancelledAppointments(event: Event): void {
    this.isHiddeCancelled = (<HTMLInputElement>event.target).checked;

    if (this.isHiddeCancelled) {
      this.availableHours =
        this.selectedBook.availableHours?.filter(
          (slot) => slot.isCancelled != true
        ) ?? [];
      return;
    }

    this.availableHours = this.selectedBook.availableHours!;
  }

  selectBook(event: any): void {
    console.log(event.target.value);

    this.selectedBook = this.availableBooks.filter(
      (x) => x.bookDateStringValue! == event.target.value
    )[0];

    if (this.isHiddeCancelled) {
      this.availableHours =
        this.selectedBook.availableHours?.filter(
          (slot) => slot.isCancelled != true
        ) ?? [];
      return;
    }

    this.availableHours = this.selectedBook.availableHours!;
  }

  private getAvailbleBooksByProfessional(): void {
    this.loading = true;
    this.bookService
      .getBooksByProfessionalEmail('edu.nery.cordeiro@gmail.com')
      .subscribe({
        next: (response: Book[]) => {
          this.availableBooks = response;
          console.log(response);
        },
        error: (error: string) => {
          console.error(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}

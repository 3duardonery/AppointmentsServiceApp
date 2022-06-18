import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() numberOfAppointments: number = 0;

  today: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    console.log(this.today.toLocaleString());
    console.log(this.today.toDateString());
    console.log(this.today.toString());
    console.log(this.today.toLocaleDateString());
  }
}

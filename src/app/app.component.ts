import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  baseUrl: string = 'https://localhost:44359/api/'
  title = 'e-commercial-perfume-fe';
  private http = inject(HttpClient);
  products: any[] = [];

  ngOnInit(): void {
    this.http.get<any>(this.baseUrl + 'Products').subscribe({
      next: response => {
        console.log(response);
        this.products = response.items;
      },
      error: error => console.error(error),
      complete: () => {
        console.log("complete")
      }
      
    })
  }
}

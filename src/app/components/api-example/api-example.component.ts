import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/example.service';

@Component({
  selector: 'app-api-example',
  standalone: true,
  imports: [NgFor],
  templateUrl: './api-example.component.html',
  styleUrl: './api-example.component.scss'
})
export class ApiExampleComponent {
  posts: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      this.posts = data;
    });
  }
}

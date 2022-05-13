import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  constructor(public router: Router, private detSer: DetailsService) {}
  ngOnInit(): void {}
  onChange(event: MatTabChangeEvent) {
    this.detSer.onChange(event);
  }
}

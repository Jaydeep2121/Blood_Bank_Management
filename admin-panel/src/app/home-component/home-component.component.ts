import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HomeService } from './home.service';

declare var google:any;
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  constructor(public homeSer: HomeService,private authgr:AuthGuard,private router: Router) {}
  ngOnInit(): void {
    this.homeSer.isAuthenticate();
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    google.charts.setOnLoadCallback(this.drawChart1);
  }
  drawChart(){
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ]);
    var options = {
      title: 'My Daily Activities',
      is3D: true,
      chartArea: {width: 400, height: 300}
    };
   var chart = new google.visualization.PieChart(document.getElementById("adminChart"));
   chart.draw(data,options);
  }
  drawChart1() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Visitations', { role: 'style' } ],
      ['2010', 10, 'color: gray'],
      ['2020', 14, 'color: #76A7FA'],
      ['2030', 16, 'opacity: 0.2'],
      ['2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
      ['2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
    ]);
    var options = {
      title: 'My Daily Activities',
      chartArea: {width: 400, height: 300}
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("newChart"));
    chart.draw(data,options);
  }
}

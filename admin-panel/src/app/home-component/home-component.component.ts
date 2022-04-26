import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
declare var google:any;
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  constructor(public homeSer: HomeService) {}
  ngOnInit(): void {
    this.homeSer.isAuthenticate();
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart(){
    var data = google.visualization.arrayToDataTable([
      ['Element', 'Density', { role: 'style' }],
      ['Copper', 8.94, '#b87333'],            // RGB value
      ['Silver', 10.49, 'silver'],            // English color name
      ['Gold', 19.30, 'gold'],
      ['Platinum', 21.45, 'color: #e5e4e2' ], // CSS-style declaration
   ]);
   var chart = new google.visualization.BarChart(document.getElementById("adminChart"));
   chart.draw(data,null);
  }
}

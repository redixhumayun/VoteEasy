import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

	@Input() data: Array<any>;

	private titles: string[] = [];
	private votes: number[] = [];
	private doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  	this.loadChart();
  }

  loadChart() {
  	this.titles = [];
  	this.votes = [];
  	this.data.map((datum) => {
  		this.titles.push(datum.name);
  		this.votes.push(datum.votes);
  	});
  }

  ngOnChanges(changes: SimpleChanges) {
  	if(!changes.firstChange) {
  		this.loadChart()
  	}
  }

}

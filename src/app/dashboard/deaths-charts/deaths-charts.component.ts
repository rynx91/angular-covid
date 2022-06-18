import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, Input, OnInit } from '@angular/core';
import { AbstractBaseComponent } from "src/app/abstract/abstract-base.component";
import { CovidHistoryByCountryInterface, CovidHistoryInterface } from 'src/app/model/covid.type';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-deaths-charts',
  templateUrl: './deaths-charts.component.html',
  styleUrls: ['./deaths-charts.component.scss']
})
export class DeathsChartsComponent extends AbstractBaseComponent implements OnInit {

  @Input() globalHistory: CovidHistoryInterface;
  @Input() countryHistory: CovidHistoryByCountryInterface;

  private chart: am4charts.XYChart;
  chartData = [];
  historyData: CovidHistoryInterface;
  
  constructor() {
    super();
  }

  ngOnInit() {
    if(!!this.globalHistory) {
      this.historyData = this.globalHistory;
    } else if(!!this.countryHistory) {
      this.historyData = this.countryHistory.timeline;
    }
  }

  ngAfterViewInit(): void {
    this.generateChartData();
  }

  ngOnDestroy(): void {
    am4core.disposeAllCharts();
  }

  generateChartData() {
    this.chartData = [];
    let data = (!!this.historyData && !!this.historyData.deaths)? this.historyData.deaths : {};
    
    if(!!data) {
      const keys = Object.keys(data);
      keys.forEach((key, index) => {
        this.chartData.push(
          {
            date: new Date(key).setHours(0,0,0,0),
            value: data[key]
          }
        )
      });
      this.createChart();
    }
  }

  createChart() {
    this.chart = am4core.create("deathschartdiv", am4charts.XYChart);
    this.chart.data = this.chartData;

    // Create axes
    let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";

    //tootip
    series.tooltipText = `[bold]{dateX}[/]
    ----
    Total deaths: {valueY}`;      
    series.tooltip.pointerOrientation = "vertical";
    
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.snapToSeries = series;
    this.chart.cursor.xAxis = dateAxis;

    let title = this.chart.titles.create();
    title.text = 'Accumulated COVID-19 Deaths';
    title.textAlign = 'middle';
    title.fontSize = 25;
  }

}

import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CovidInfoInterface } from 'src/app/model/covid.type';
import { AbstractBaseComponent } from 'src/app/abstract/abstract-base.component';

@Component({
  selector: 'app-accumulated-charts',
  templateUrl: './accumulated-charts.component.html',
  styleUrls: ['./accumulated-charts.component.scss']
})
export class AccumulatedChartsComponent extends AbstractBaseComponent implements OnInit {

  @Input() chartData;

  private chart: am4charts.XYChart;
  chartColors = ["#ea5545", "#ef9b20", "#ede15b", "#87bc45", "#27aeef", "#b33dc6"];

  constructor() {
    super();
   }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.chart = am4core.create("accumulatedchartdiv", am4charts.XYChart);

    let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "continent";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "continent";
    series.dataFields.valueX = "totalCases";

    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.truncate = false;
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    var legend = new am4charts.Legend();
    legend.parent = this.chart.chartContainer;
    legend.itemContainers.template.togglable = false;
    legend.marginTop = 20;

    series.events.on("ready", function(ev) {
      let legenddata = [];
      series.columns.each(function(column) {
        legenddata.push({
          name: column.column._dataItem.categories.categoryY + "\n Active Cases:" + column.column.dataItem.values.valueX.value,
          fill: column.fill
        })
      });
      legend.data = legenddata;
    });

    series.columns.template.adapter.add("fill", (fill, target) => {
      return am4core.color(this.chartColors[target.dataItem.index]);
    });

    categoryAxis.sortBySeries = series;
    this.chart.data = this.chartData;
  }

}

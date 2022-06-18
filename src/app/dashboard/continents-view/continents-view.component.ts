import { Component, OnDestroy, OnInit } from '@angular/core';
import { CovidInfoInterface } from 'src/app/model/covid.type';
import { CovidService } from 'src/app/shared/service/covid.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-continents-view',
  templateUrl: './continents-view.component.html',
  styleUrls: ['./continents-view.component.scss']
})
export class ContinentsViewComponent implements OnInit, OnDestroy {

  statistics: CovidInfoInterface[];
  private chart: am4charts.XYChart;
  chartData = [];
  accumulatedChartData;
  chartColors = ["#ea5545", "#ef9b20", "#ede15b", "#87bc45", "#27aeef", "#b33dc6"];

  constructor(
    private covidService: CovidService
  ) { }

  ngOnInit() {
    this.covidService.getStatisticsForContinents().subscribe(res => {
      this.statistics = res;
      this.generateChartData();
    })
  }

  ngOnDestroy(): void {
    am4core.disposeAllCharts();
  }

  generateChartData() {
    this.chartData = [];
    let accumulated = [];
    for(let s of this.statistics) {
      this.chartData.push({
        "continent": s.continent,
        "activeCases": s.active
      });
      accumulated.push({
        "continent": s.continent,
        "totalCases": s.cases
      })
    }
    this.accumulatedChartData = accumulated;
    this.createChart();
  }

  createChart() {
    this.chart = am4core.create("activechartdiv", am4charts.XYChart);

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
    series.dataFields.valueX = "activeCases";

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
          name: column.dataItem.categoryY + "\n Active Cases:" + column.dataItem.valueX,
          fill: column.fill
        })
      });
      legend.data = legenddata;
    });


    series.columns.template.adapter.add("fill", (fill, target) => {
      return this.chartColors[target.dataItem.index];
    });

    categoryAxis.sortBySeries = series;
    this.chart.data = this.chartData;
  }

}

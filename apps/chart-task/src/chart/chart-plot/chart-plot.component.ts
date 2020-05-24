import {Component, Input, OnChanges, OnInit} from '@angular/core';
import HistogramItem from "./interfaces/histogram-item";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'chart-task-chart-plot',
  templateUrl: './chart-plot.component.html',
  styleUrls: ['./chart-plot.component.styl']
})

/**
 * Describes chart plot component: place where chart is actually drawn.
 */
export class ChartPlotComponent implements OnInit, OnChanges {
  /** List of items to draw chart from */
  @Input() items: HistogramItem[];


  /** Maximum height of bar in pixels. */
  readonly BAR_HEIGHT = 300;
  /** Bar width in pixels. */
  readonly BARS_WIDTH = 50;
  /** Total plot height. */
  readonly PLOT_HEIGHT = this.BAR_HEIGHT
                           + 30   // Bottom labels
                           + 20;  // Top arrow space


  /**
   * Maximum value of items.
   * Used to draw labels and calculate scale to calc bar heights relative to biggest one.  */
  maxValue$ = new BehaviorSubject<number>(1);
  /** Scale shows how relates biggest bar to bar height. */
  scale: number = this.BAR_HEIGHT;
  /** Labels of Y axis. Recalculates on maxValue change. */
  yLabels: number[];
  /** Plot width. Growth as more bars added to chart. */
  plotWidth = 300;


  ngOnInit(): void {
    this.maxValue$.subscribe((value: number) => {
      this.scale = this.BAR_HEIGHT / value;

      const labels = [];
      for (let i = 0; i < 5; i++) {
        labels.push(value / (i + 1));
      }
      this.yLabels = labels;
    });
  }

  /**
   * Recalculates max value from updated items.
   *
   * @param changes   Changes being made to params.
   */
  ngOnChanges(changes): void {
    if (changes.items) {
      const maxValue = this.items.reduce(
        (value: number, x: HistogramItem) => Math.max(x.value, value), 1
      );
      if (this.maxValue$.value !== maxValue) {
        this.maxValue$.next(maxValue);
      }
      this.plotWidth = (this.items.length + 1) * this.BARS_WIDTH
                         + 85   // Text offset
                         + 20;  // To make pretty
    }
  }
}

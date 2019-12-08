import React, {Component} from "react";
import Options from "../../../../training-data/optionsData";
import Select from "react-select";
import {dateSortAsc, getDateByTimestamp} from "../../../../utils/Helpers";
import withAuthorization from "../../../hoc/with-authorization/with-authorization.jsx";
import {compose} from "recompose";
import Chart from 'react-apexcharts'

const ONE_WEEK_MILLISECONDS = 604800000; //milliseconds
const ONE_MONTH_MILLISECONDS = 2629800000;

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(filter) {
    this.setState({filter})
  }

  fillWithLabels() {
    const bodyParts = [...Options.optionsPartBody];

    return bodyParts.map(item => {
      return item.label
    });
  }

  fillCurrentMonthDates() {
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    const datesArray = [];
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysCounts = daysInMonth(month, year);

    for (let i = 1; i <= daysCounts; i++) {
      datesArray.push([i, 0])
    }

    return datesArray;
  }

  getMonthName() {
    const monthNames = [
      "Января", "Февраля", "Марта",
      "Апреля", "Мая", "Июня", "Июля",
      "Августа", "Сентября", "Октября",
      "Ноября", "Декабря"
    ];

    const month = new Date().getMonth();
    const string = monthNames[month].substring(0, 3);

    return string;
  }

  getTotalTrainingsCount() {
    return this.props.trainings.length;
  };

  getTrainingsForLastTime(millisecs) {
    const trainings = [...this.props.trainings];
    const NOW_MILLISECONDS = Date.now();
    let counts = 0;

    trainings.sort(dateSortAsc);

    trainings.forEach(item => {
      const date = getDateByTimestamp(item[1].training.date);

      const itemTime = date.getTime(); //milliseconds
      if (itemTime + millisecs > NOW_MILLISECONDS) {
        counts++;
      } else {
        return;
      }
    });

    return counts;
  }

  getDataForRadar() {
    const trainings = [...this.props.trainings];
    const labels = this.fillWithLabels();
    const data = Array(labels.length).fill(0);

    if (trainings.length !== 0) {
      trainings.forEach(item => {
        const sessions = item[1].training.sessions;

        for (let i = 0; i < sessions.length; i++) {
          const exercisesCounts = sessions[i].exercises.length;
          const indexItem = labels.findIndex(elem => elem === sessions[i].partBody.label);
          data[indexItem] += exercisesCounts;
        }
      });
    }

    return {
      chart: {
        type: 'radar'
      },
      labels,
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: '#e9e9e9',
            fill: {
              colors: ['#f8f8f8', '#fff']
            }
          }
        }
      },
      title: {
        text: ''
      },
      colors: ['#FF4560'],
      markers: {
        size: 4,
        colors: ['#fff'],
        strokeColor: '#FF4560',
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val
          }
        }
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function(val, i) {
            if (i % 2 === 0) {
              return parseFloat(val).toFixed(1)
              } else {
              return ''
            }
          }
        }
      },
      series: [{name: 'Series 1', data}]
    };
  }

  getDataForTonnage() {
    const {filter} = this.state;
    if (filter === null) return;

    const trainings = [...this.props.trainings];
    const resultDates = this.fillCurrentMonthDates();
    const currentMonthData = [];

    trainings.forEach((item, index) => {
      const {sessions, date} = item[1].training;

      for (const el of sessions) {
        const partBody = el.partBody.value;
        const filterValue = filter.value;

        if (partBody === filterValue) {
          let tonnage = 0;
          for (const element of el.exercises) {
            const weight = Number(element.weight);
            const sets = Number(element.sets);
            const repeats = Number(element.repeats);

            tonnage += weight * sets * repeats;
          }

          currentMonthData.push({date, tonnage});
        }
      }
    });

    resultDates.forEach(item => {
      for (const el of currentMonthData) {
        if (item[0] === new Date(el.date).getDate()) {
          item[1] += el.tonnage;
        }
      }
    });

    return {
      options: {
        type: 'numeric',
        chart: {
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return val + 'kek'
            }
          }
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function(val) {
              return val + 'kek'
            }
          }
        }
      },
      series: [{
        name: "Тоннаж, кг",
        data: resultDates
      }],
    };
  }

  render() {
    const {filter} = this.state;
    const totalTrainings = this.getTotalTrainingsCount();
    const forLast30DaysTrainings = this.getTrainingsForLastTime(ONE_MONTH_MILLISECONDS);
    const forLast7DaysTrainings = this.getTrainingsForLastTime(ONE_WEEK_MILLISECONDS);
    const radarData = this.getDataForRadar();
    const tonnageData = this.getDataForTonnage();

    return (
      <React.Fragment>
        <div className="statistic">
          <div className="statistic__summary">
            <h2 className="statistic__summary-title">Сводка о тренировках</h2>
            <ul className="statistic__summary-list">
              <li className="statistic__summary-item">Общее количество
                тренировок: {totalTrainings > 0 ? totalTrainings : 0}</li>
              <li className="statistic__summary-item">Тренировок за последние 30
                дней: {forLast30DaysTrainings > 0 ? forLast30DaysTrainings : 0}</li>
              <li className="statistic__summary-item">Тренировок за последние 7
                дней: {forLast7DaysTrainings > 0 ? forLast7DaysTrainings : 0}</li>
            </ul>
          </div>

          <React.Fragment>
            <h3>Загруженность частей тела</h3>
            <Chart options={radarData} series={radarData.series} type="radar" width={500} height={320}/>
          </React.Fragment>
          <div className="tonnage-chart">
            <Select
              className="card__select"
              value={filter}
              placeholder="Фильтр"
              onChange={this.onFilterChange}
              options={Options.optionsTonnageChart} />
            {
              filter !== null && <Chart options={tonnageData} series={tonnageData.series} type="scatter" height="350" />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition)
)(Statistics);

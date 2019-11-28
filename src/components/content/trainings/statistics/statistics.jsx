import React, {Component} from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import Options from "../../../../training-data/optionsData";
import Select from "react-select";
import {dateSortAsc, getDateByTimestamp} from "../../../../utils/Helpers";

const ONE_WEEK_MILLISECONDS = 604800000; //milliseconds
const ONE_MONTH_MILLISECONDS = 2629800000;
const data = [
  {x: 100, y: 200}, {x: 120, y: 100},
  {x: 170, y: 300}, {x: 140, y: 250},
  {x: 150, y: 400}, {x: 110, y: 280,}
];

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

  fillDefaultData() {
    const bodyParts = [...Options.optionsPartBody];

    return bodyParts.map(item => {
      return {subject: item.label, value: 0}
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
      datesArray.push({day: i})
    }

    return datesArray;
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
    const data = this.fillDefaultData();
    if (trainings.length === 0) return data;

    trainings.forEach(item => {
      const sessions = item[1].training.sessions;

      for (let i = 0; i < sessions.length; i++) {
        const exercisesCounts = sessions[i].exercises.length;
        const indexItem = data.findIndex(elem => elem.subject === sessions[i].partBody.label);
        data[indexItem].value += exercisesCounts;
      }
    });

    return data;
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
        if (item.day === el.date.getDate()) {
          item.tonnage !== undefined ? item.tonnage += el.tonnage : item.tonnage = el.tonnage;
        }
      }
    });

    return resultDates;
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
            <div className="polar-grid">
              <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={450} data={radarData}>
                <PolarGrid/>
                <PolarAngleAxis dataKey="subject"/>
                <PolarRadiusAxis/>
                <Radar name="parts" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
              </RadarChart>
            </div>
          </React.Fragment>

          <div className="tonnage-chart">
            <Select
              className="card__select"
              value={filter}
              placeholder="Фильтр"
              onChange={this.onFilterChange}
              options={Options.optionsTonnageChart}
            />
            {filter !== null && (
              <ScatterChart width={600} height={400}>
                <CartesianGrid/>
                <XAxis dataKey={'day'} type="number" name='Дата' unit=''/>
                <YAxis dataKey={'tonnage'} type="number" name='Вес' unit='kg'/>
                <Scatter name={'name'} data={tonnageData} fill='#8884d8'/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
              </ScatterChart>
            )}
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default Statistics;

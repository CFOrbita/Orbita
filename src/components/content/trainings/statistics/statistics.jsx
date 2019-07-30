import React, {Component} from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import {dateSortAsc} from "../../../../utils/Helpers";
import Options from "../../../../training-data/optionsData";

const ONE_WEEK_MILLISECONDS = 604800000; //milliseconds
const ONE_MONTH_MILLISECONDS = 2629800000;
const data = [{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
  {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
  {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}];

class Statistics extends Component {
  constructor(props) {
    super(props);
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
      const itemTime = item.date.getTime(); //milliseconds
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
    const bodyParts = [...Options.optionsPartBody];
    const data = [];

    trainings.forEach(item => {
      for (let i = 0; i < item.sessions.length; i++) {
        if (data.some(elem => elem.subject === item.sessions[i].partBody.label)) {
          const indexItem = data.findIndex(elem => elem.subject === item.sessions[i].partBody.label);
          data[indexItem].value++;
        } else {
          const label = bodyParts.filter(elem => elem.value === item.sessions[i].partBody.value)[0].label;
          data.push({subject: label, value: 1});
        }
      }
    });

    return data;
  }

  getDataForTonnage() {
    const trainings = [...this.props.trainings];
    const bodyParts = [...Options.optionsPartBody];
    const data = [];

    trainings.forEach(item => {
      for (let i = 0; i < item.sessions.length; i++) {
        if (data.some(elem => elem.subject === item.sessions[i].partBody.label)) {
          const indexItem = data.findIndex(elem => elem.subject === item.sessions[i].partBody.label);
          data[indexItem].value++;
        } else {
          const label = bodyParts.filter(elem => elem.value === item.sessions[i].partBody.value)[0].label;
          data.push({subject: label, value: 1});
        }
      }
    });

    return data;
  }

  render() {
    const totalTrainings = this.getTotalTrainingsCount();
    const forLast30DaysTrainings = this.getTrainingsForLastTime(ONE_MONTH_MILLISECONDS);
    const forLast7DaysTrainings = this.getTrainingsForLastTime(ONE_WEEK_MILLISECONDS);
    const radarData = this.getDataForRadar();

    return (
      <React.Fragment>
        <div className="statistic">
          <div className="statistic__summary">
            <h2 className="statistic__summary-title">Сводка о тренировках</h2>
            <ul className="statistic__summary-list">
              <li className="statistic__summary-item">Общее количество тренировок: {totalTrainings > 0 ? totalTrainings : 0}</li>
              <li className="statistic__summary-item">Тренировки за последние 30 дней: {forLast30DaysTrainings > 0 ? forLast30DaysTrainings : 0}</li>
              <li className="statistic__summary-item">Тренировки за последние 7 дней: {forLast7DaysTrainings > 0 ? forLast7DaysTrainings : 0}</li>
            </ul>
          </div>

          {
            radarData.length >= 3  && (
              <React.Fragment>
                <h3>Загруженность частей тела</h3>
                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={400} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis/>
                  <Radar name="parts" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                </RadarChart>
              </React.Fragment>
            )
          }

          <ScatterChart width={400} height={400}>
            <CartesianGrid />
            <XAxis dataKey={'x'} type="number" name='stature' unit='cm'/>
            <YAxis dataKey={'y'} type="number" name='weight' unit='kg'/>
            <Scatter name='A school' data={data} fill='#8884d8'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          </ScatterChart>
        </div>
      </React.Fragment>
    );
  }
}

export default Statistics;

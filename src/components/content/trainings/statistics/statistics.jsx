import React, {Component} from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {dateSortAsc} from "../../../../utils/Helpers";
import Options from "../../../../training-data/optionsData";

const ONE_WEEK_MILLISECONDS = 604800000; //milliseconds
const ONE_MONTH_MILLISECONDS = 2629800000;
const data = [
  { subject: 'Math', A: 120 },
  { subject: 'Chinese', A: 98},
  { subject: 'English', A: 86 },
  { subject: 'Geography', A: 99 },
  { subject: 'Physics', A: 85},
  { subject: 'History', A: 65},
];

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
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis/>
            <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>
      </React.Fragment>
    );
  }
}

export default Statistics;

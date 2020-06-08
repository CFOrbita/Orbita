import React, {useContext} from 'react'
import Select from "react-select";
import Options from "../../../../training-data/optionsData";
import {CardContext} from "../../../../context";

export const TrainingCardHeader = () => {
  const {place, date, onDateChange, onPlaceChange} = useContext(CardContext);
  return (
    <div className="card-header">
      <div className="card-header__info card-header__left">
        <input type="date"
               className="card__date-picker"
               value={date}
               onChange={(e) => onDateChange(e.target.value)} />

        <Select className="card__select"
                placeholder="Место"
                value={place}
                onChange={onPlaceChange}
                options={Options.optionsPlace} />
      </div>
    </div>
  )
};

import React from "react";
import Select from "react-select";

const Workout = props => {
  return (
    <React.Fragment>
      <Select
        className="card__select"
        value={partBody}
        placeholder="Часть тела"
        onChange={this.handleBodyPartChange}
        options={optionsPartBody} />
    </React.Fragment>
  );
};

export default Workout;

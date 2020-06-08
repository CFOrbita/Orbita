import React from "react";
import {TrainingCardContent} from "../training-content/training-content";
import {TrainingCardHeader} from "../card-header/card-header";
import {TrainingCardErrors} from "../card-errors/card-errors";
import {TrainingCardAddSession} from "../card-add-session";
import {TrainingCardComment} from "../card-comment";
import {TrainingCardFooter} from "../card-footer";
import {TrainingCardTypes} from "../card-types";

export const TrainingCardEdit = () => {
  return (
    <div className="card">
      <TrainingCardHeader/>
      <TrainingCardErrors/>

      <TrainingCardTypes/>

      <TrainingCardContent/>
      <TrainingCardAddSession/>

      <TrainingCardComment/>
      <TrainingCardFooter/>
    </div>
  )
};

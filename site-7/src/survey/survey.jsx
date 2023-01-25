import React from "react";
import { useState } from "react";
import "./survey.css";

function Survey({ setSeconFieldActive }) {
  const [survey, setSurvey] = useState(1);
  return (
    <div className="survey">
      <h2>To see if you qualify, please answer these 3 questions:</h2>
      <p className="sonf">
        <i> Information 100% confidential</i>
      </p>
      {survey === 1 ? (
        <div className="survey_1">
          <p className="survey_ques">Are you male or female?</p>
          <div className="survey_progress">
            <div className="progress_in_1"></div>
          </div>
          <div className="survey_list">
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Male</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Famale</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {survey === 2 ? (
        <div className="survey_1">
          <p className="survey_ques">What age are you?</p>
          <div className="survey_progress">
            <div className="progress_in_2"></div>
          </div>
          <div className="survey_list">
            <div className="survey_list_item" onClick={() => setSurvey(3)}>
              <input type="radio" name="" id="" />
              <p>40 - 50</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(3)}>
              <input type="radio" name="" id="" />
              <p>50 - 60</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(3)}>
              <input type="radio" name="" id="" />
              <p>60 - 70</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(3)}>
              <input type="radio" name="" id="" />
              <p>70+</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {survey === 3 ? (
        <div className="survey_1">
          <p className="survey_ques">
            Have you ever used an online dating site before?
          </p>
          <div className="survey_progress">
            <div className="progress_in_3"></div>
          </div>
          <div className="survey_list">
            <div
              className="survey_list_item"
              onClick={() => setSeconFieldActive(1)}
            >
              <input type="radio" name="" id="" />
              <p>Yes</p>
            </div>
            <div
              className="survey_list_item"
              onClick={() => setSeconFieldActive(1)}
            >
              <input type="radio" name="" id="" />
              <p>No</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Survey;

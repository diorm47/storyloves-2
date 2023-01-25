import React from "react";
import { useState } from "react";
import "./survey.css";

function Survey({ setSeconFieldActive }) {
  const [survey, setSurvey] = useState(1);
  return (
    <div className="survey">
      <h2>Aby sprawdzić, czy się kwalifikujesz, odpowiedz na te 3 pytania:</h2>
      <p className="sonf">
        <i>Informacje w 100% poufne</i>
      </p>
      {survey === 1 ? (
        <div className="survey_1">
          <p className="survey_ques">Czy jesteś mężczyzną czy kobietą?</p>
          <div className="survey_progress">
            <div className="progress_in_1"></div>
          </div>
          <div className="survey_list">
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Mężczyzna</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Kobieta</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {survey === 2 ? (
        <div className="survey_1">
          <p className="survey_ques">W jakim wieku jesteś?</p>
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
            Czy kiedykolwiek wcześniej korzystałeś z internetowego serwisu
            randkowego?
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
              <p>Tak</p>
            </div>
            <div
              className="survey_list_item"
              onClick={() => setSeconFieldActive(1)}
            >
              <input type="radio" name="" id="" />
              <p>Nie</p>
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

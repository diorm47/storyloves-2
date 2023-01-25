import React from "react";
import { useState } from "react";
import "./survey.css";

function Survey({ setSeconFieldActive }) {
  const [survey, setSurvey] = useState(1);
  return (
    <div className="survey">
      <h2>
        Pentru a vedea dacă vă calificați, vă rugăm să răspundeți la aceste 3
        întrebări:
      </h2>
      <p className="sonf">
        <i>Informații 100% confidențiale</i>
      </p>
      {survey === 1 ? (
        <div className="survey_1">
          <p className="survey_ques">Sunteți bărbat sau femeie?</p>
          <div className="survey_progress">
            <div className="progress_in_1"></div>
          </div>
          <div className="survey_list">
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Bărbat</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Femeie</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {survey === 2 ? (
        <div className="survey_1">
          <p className="survey_ques">Ce varsta ai?</p>
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
            Ați mai folosit vreodată un site de întâlniri online?
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
              <p>Da</p>
            </div>
            <div
              className="survey_list_item"
              onClick={() => setSeconFieldActive(1)}
            >
              <input type="radio" name="" id="" />
              <p>Nu</p>
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

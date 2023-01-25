import React from "react";
import { useState } from "react";
import "./survey.css";

function Survey({ setSeconFieldActive }) {
  const [survey, setSurvey] = useState(1);
  return (
    <div className="survey">
      <h2>
        Para saber si cumple los requisitos, responda a estas 3 preguntas:
      </h2>
      <p className="sonf">
        <i>Información 100% confidencial</i>
      </p>
      {survey === 1 ? (
        <div className="survey_1">
          <p className="survey_ques">¿Es usted hombre o mujer?</p>
          <div className="survey_progress">
            <div className="progress_in_1"></div>
          </div>
          <div className="survey_list">
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Hombre</p>
            </div>
            <div className="survey_list_item" onClick={() => setSurvey(2)}>
              <input type="radio" name="" id="" />
              <p>Mujer</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {survey === 2 ? (
        <div className="survey_1">
          <p className="survey_ques">¿Qué edad tienes?</p>
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
            ¿Alguna vez has usado un sitio de citas en línea antes?
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
              <p>Sí</p>
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

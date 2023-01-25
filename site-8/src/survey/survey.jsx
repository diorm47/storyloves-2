import React from "react";
import "./survey.css";

import { ReactComponent as Gender } from "../assets/gender.svg";
import { ReactComponent as Seeking } from "../assets/seeking.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { useState } from "react";

function Survey({ setToggleScreen }) {
  const [lookingGender, setLookingGender] = useState("");
  const [myGender, setMyGender] = useState("");
  const [seeking, setSeeking] = useState("");
  const [prefer, setPrefer] = useState([]);
  const [surveyBlock, setSurveyBlock] = useState(1);
  console.log(prefer);
  const setPreferBlock = (props) => {
    if (!prefer.some((item) => item === props)) {
      setPrefer([...prefer, props]);
    }
  };
  const clear = () => {
    setPrefer([]);
    setPrefer(["clear"]);
  };
  return (
    <div className="survey">
      {surveyBlock === 1 ? (
        <div className="survey_block_1">
          <div className="prev_field" onClick={() => setToggleScreen(0)}>
            <Arrow /> <p>Back</p>
          </div>
          <Gender />
          <div className="gender_selet">
            <p>I am</p>
            <div className="set_gender">
              <button
                className={myGender === "woman" ? "active_gender_looking" : ""}
                onClick={() => setMyGender("woman")}
              >
                a woman
              </button>
              <button
                onClick={() => setMyGender("man")}
                className={myGender === "man" ? "active_gender_looking" : ""}
              >
                a man
              </button>
            </div>
            <p>Looking for</p>
            <div className="set_gender">
              <button
                className={
                  lookingGender === "woman" ? "active_gender_looking" : ""
                }
                onClick={() => setLookingGender("woman")}
              >
                a woman
              </button>
              <button
                onClick={() => setLookingGender("man")}
                className={
                  lookingGender === "man" ? "active_gender_looking" : ""
                }
              >
                a man
              </button>
            </div>
            {!(myGender === "") & !(lookingGender === "") ? (
              <div className="next_btn_active">
                <button onClick={() => setSurveyBlock(2)}>Next</button>
              </div>
            ) : (
              <div className="next_btn">
                <button>Next</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {surveyBlock === 2 ? (
        <div className="survey_block_1">
          <div className="prev_field" onClick={() => setSurveyBlock(1)}>
            <Arrow /> <p>Back</p>
          </div>
          <Seeking />
          <div className="gender_selet">
            <p>I am seeking</p>

            <div className="seeking_bl">
              <button
                className={
                  seeking === "Serious relationship" ? "seeking_active_btn" : ""
                }
                onClick={() => setSeeking("Serious relationship")}
              >
                Serious relationship
              </button>
              <button
                className={
                  seeking === "Life partner/companion"
                    ? "seeking_active_btn"
                    : ""
                }
                onClick={() => setSeeking("Life partner/companion")}
              >
                Life partner/companion
              </button>
              <button
                className={
                  seeking === "Travel mate" ? "seeking_active_btn" : ""
                }
                onClick={() => setSeeking("Travel mate")}
              >
                Travel mate
              </button>
              <button
                className={seeking === "Hookups" ? "seeking_active_btn" : ""}
                onClick={() => setSeeking("Hookups")}
              >
                Hookups
              </button>
              <button
                className={
                  seeking === "Online friendship/penpal"
                    ? "seeking_active_btn"
                    : ""
                }
                onClick={() => setSeeking("Online friendship/penpal")}
              >
                Online friendship/penpal
              </button>
            </div>

            {!(seeking === "") ? (
              <div className="next_btn_active">
                <button onClick={() => setSurveyBlock(3)}>Next</button>
              </div>
            ) : (
              <div className="next_btn">
                <button>Next</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {surveyBlock === 3 ? (
        <div className="survey_block_1">
          <div className="prev_field" onClick={() => setSurveyBlock(2)}>
            <Arrow /> <p>Back</p>
          </div>

          <div className="prefer_block">
            <h3>I prefer members who are from...</h3>
            <p>You can choose more than one</p>
            {lookingGender === "woman" ? (
              <div className="prefer_carts">
                <div
                  className={
                    !prefer.some((item) => item === "Asian")
                      ? "prefer_cart prefer_cart_girl_1"
                      : "prefer_cart prefer_cart_girl_1 active_prefer"
                  }
                  onClick={() => setPreferBlock("Asian")}
                >
                  <p>Asian</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Latin America")
                      ? "prefer_cart prefer_cart_girl_2"
                      : "prefer_cart prefer_cart_girl_2 active_prefer"
                  }
                  onClick={() => setPreferBlock("Latin America")}
                >
                  <p>Latin America</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Europe")
                      ? "prefer_cart prefer_cart_girl_3"
                      : "prefer_cart prefer_cart_girl_3 active_prefer"
                  }
                  onClick={() => setPreferBlock("Europe")}
                >
                  <p>Europe</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "North America")
                      ? "prefer_cart prefer_cart_girl_4"
                      : "prefer_cart prefer_cart_girl_4 active_prefer"
                  }
                  onClick={() => setPreferBlock("North America")}
                >
                  <p>North America</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Africa")
                      ? "prefer_cart prefer_cart_girl_5"
                      : "prefer_cart prefer_cart_girl_5 active_prefer"
                  }
                  onClick={() => setPreferBlock("Africa")}
                >
                  <p>Africa</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "clear")
                      ? "prefer_cart prefer_cart_girl_6"
                      : "prefer_cart prefer_cart_girl_6 active_prefer"
                  }
                  onClick={() => clear("clear")}
                >
                  <p>Show me all</p>
                </div>
              </div>
            ) : (
              <div className="prefer_carts">
                <div
                  className={
                    !prefer.some((item) => item === "Asian")
                      ? "prefer_cart prefer_cart_men_1"
                      : "prefer_cart prefer_cart_men_1 active_prefer"
                  }
                  onClick={() => setPreferBlock("Asian")}
                >
                  <p>Asian</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Latin America")
                      ? "prefer_cart prefer_cart_men_2"
                      : "prefer_cart prefer_cart_men_2 active_prefer"
                  }
                  onClick={() => setPreferBlock("Latin America")}
                >
                  <p>Latin America</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Europe")
                      ? "prefer_cart prefer_cart_men_3"
                      : "prefer_cart prefer_cart_men_3 active_prefer"
                  }
                  onClick={() => setPreferBlock("Europe")}
                >
                  <p>Europe</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "North America")
                      ? "prefer_cart prefer_cart_men_4"
                      : "prefer_cart prefer_cart_men_4 active_prefer"
                  }
                  onClick={() => setPreferBlock("North America")}
                >
                  <p>North America</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "Africa")
                      ? "prefer_cart prefer_cart_men_5"
                      : "prefer_cart prefer_cart_men_5 active_prefer"
                  }
                  onClick={() => setPreferBlock("Africa")}
                >
                  <p>Africa</p>
                </div>
                <div
                  className={
                    !prefer.some((item) => item === "clear")
                      ? "prefer_cart prefer_cart_men_6"
                      : "prefer_cart prefer_cart_men_6 active_prefer"
                  }
                  onClick={() => setPreferBlock("clear")}
                >
                  <p>Show me all</p>
                </div>
              </div>
            )}

            {(prefer.length > 0) ? (
              <div className="next_btn_active">
                <button onClick={() => setToggleScreen(2)}>Next</button>
              </div>
            ) : (
              <div className="next_btn">
                <button>Next</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="btm_ident">
        <div
          className={
            surveyBlock >= 1 ? "btm_ident_item_active" : "btm_ident_item"
          }
        ></div>
        <div
          className={
            surveyBlock >= 2 ? "btm_ident_item_active" : "btm_ident_item"
          }
        ></div>
        <div
          className={
            surveyBlock >= 3 ? "btm_ident_item_active" : "btm_ident_item"
          }
        ></div>
        <div
          className={
            surveyBlock >= 4 ? "btm_ident_item_active" : "btm_ident_item"
          }
        ></div>
      </div>
    </div>
  );
}

export default Survey;

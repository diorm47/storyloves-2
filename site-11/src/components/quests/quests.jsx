import React from "react";
import { useEffect } from "react";
import "./quests.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";

function Quests({ setSeconFieldActive }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [quest, setQuest] = useState(1);
  return (
    <div className="quests_wrapper">
      {quest === 1 ? (
        <div className="quest" data-aos="fade-left" data-aos-duration="1000">
          <div className="q_number">
            <p>
              <span>1</span>/4
            </p>
          </div>
          <div className="q_question">
            <p>
              There could be women you know personally on this site. Do you
              agree to keep their identity a secret?
            </p>
          </div>
          <div className="q_answers">
            <button className="no_btn" onClick={() => setQuest(2)}>
              No
            </button>
            <button className="yes_btn" onClick={() => setQuest(2)}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {quest === 2 ? (
        <div className="quest" data-aos="fade-left" data-aos-duration="1000">
          <div className="q_number">
            <p>
              <span>2</span>/4
            </p>
          </div>
          <div className="q_question">
            <p>
              To find a partner, it is important to be open to communication.
              Are you ready to be active on this site?
            </p>
          </div>
          <div className="q_answers">
            <button className="no_btn" onClick={() => setQuest(3)}>
              No
            </button>
            <button className="yes_btn" onClick={() => setQuest(3)}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {quest === 3 ? (
        <div className="quest" data-aos="fade-left" data-aos-duration="1000">
          <div className="q_number">
            <p>
              <span>3</span>/4
            </p>
          </div>
          <div className="q_question">
            <p>
              Do you agree to always reply to women who initiate communication?
            </p>
          </div>
          <div className="q_answers">
            <button className="no_btn" onClick={() => setQuest(4)}>
              No
            </button>
            <button className="yes_btn" onClick={() => setQuest(4)}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {quest === 4 ? (
        <div className="quest" data-aos="fade-left" data-aos-duration="1000">
          <div className="q_number">
            <p>
              <span>4</span>/4
            </p>
          </div>
          <div className="q_question">
            <p>
              Do you agree to receive a lot of messages from women on this site?
            </p>
          </div>
          <div className="q_answers">
            <button className="no_btn" onClick={() => setSeconFieldActive(3)}>
              No
            </button>
            <button className="yes_btn" onClick={() => setSeconFieldActive(3)}>
              Yes
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Quests;

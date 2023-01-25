import React, { useState } from "react";
import "./home-page.css";
import logo from "../assets/icons/logo.png";
import Modal from "../components/modal/modal";

import circle1 from "../assets/images/1.png";
import circle2 from "../assets/images/2.png";
import circle3 from "../assets/images/3.png";
import circle4 from "../assets/images/4.png";
import circle5 from "../assets/images/5.png";
import circle6 from "../assets/images/6.png";
import circle_mob from "../assets/images/circle_mob.png";

import { ReactComponent as MaleSvg } from "../assets/icons/male.svg";
import { ReactComponent as FamaleSvg } from "../assets/icons/famale.svg";

function HomePage() {
  const [activeMale, setActiveMale] = useState(false);
  const [survey, setSetSurvey] = useState(1);
  const [activeFaMale, setActiveFamale] = useState(false);
  const [sheekingActiveMale, setSheekingActiveMale] = useState(false);
  const [sheekingActiveFaMale, setSheekingActiveFamale] = useState(false);
  const [myGender, setMyGender] = useState();
  const [seekingGender, setSeekingGender] = useState();
  const [myGenderError, setMyGenderError] = useState(false);
  const [seekingGenderError, setSeekingGenderError] = useState(false);

  const [moodError, setmoodError] = useState(false);
  const [userAge, setUserAge] = useState(18);
  const [prefer, setPrefer] = useState([]);

  const setPreferBlock = (props) => {
    if (!prefer.some((item) => item === props)) {
      setPrefer([...prefer, props]);
    }
  };

  const toggleMyGender = (gender) => {
    if (gender === "male") {
      setActiveMale(true);
      setActiveFamale(false);
      setMyGender("male");
    } else {
      setActiveMale(false);
      setActiveFamale(true);
      setMyGender("famale");
    }
  };
  const toggleSeekingGender = (gender) => {
    if (gender === "male") {
      setSheekingActiveMale(true);
      setSheekingActiveFamale(false);
      setSeekingGender("male");
    } else {
      setSheekingActiveMale(false);
      setSheekingActiveFamale(true);
      setSeekingGender("famale");
    }
  };

  const handleChange = (e) => {
    setUserAge(e.target.value);
  };
  const setSecondSurvey = () => {
    if (!prefer.length < 1) {
      setSetSurvey(2);
      setmoodError(false);
    } else {
      setmoodError(true);
    }
  };
  const setThirdSurvey = () => {
    if (!myGender) {
      setMyGenderError(true);
    } else if (!seekingGender) {
      setSeekingGenderError(true);
    } else {
      setSetSurvey(3);
    }
  };

  return (
    <>
      <header>
        <div className="home_page">
          <div className="regisration_form">
            <div className="form_logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="form_title">
              <h1>
                Attract women <br /> who understand you
              </h1>
              <p>
                The highest response rate you’ve ever experienced
                <br />
                <span>You decide what you want</span>
              </p>
            </div>
            {survey === 1 ? (
              <div className="survey_1">
                <div className="survey_title">
                  <p>What do you want?</p>
                </div>
                <div className="survey_items">
                  <div
                    className={
                      !prefer.some((item) => item === "Serious")
                        ? "survey_item"
                        : "survey_item ative_survey"
                    }
                    onClick={() => setPreferBlock("Serious")}
                  >
                    <p>Serious</p>
                  </div>
                  <div
                    className={
                      !prefer.some((item) => item === "Pen pal")
                        ? "survey_item"
                        : "survey_item ative_survey"
                    }
                    onClick={() => setPreferBlock("Pen pal")}
                  >
                    <p>Pen pal</p>
                  </div>
                  <div
                    className={
                      !prefer.some((item) => item === "Romantic")
                        ? "survey_item"
                        : "survey_item ative_survey"
                    }
                    onClick={() => setPreferBlock("Romantic")}
                  >
                    <p>Romantic</p>
                  </div>
                  <div
                    className={
                      !prefer.some((item) => item === "Flirty")
                        ? "survey_item"
                        : "survey_item ative_survey"
                    }
                    onClick={() => setPreferBlock("Flirty")}
                  >
                    <p>Flirty</p>
                  </div>
                  <div
                    className={
                      !prefer.some((item) => item === "Naughty")
                        ? "survey_item"
                        : "survey_item ative_survey"
                    }
                    onClick={() => setPreferBlock("Naughty")}
                  >
                    <p>Naughty</p>
                  </div>
                </div>
                {!moodError || <p className="moodError">Select your mood</p>}
                <div className="take_chance" onClick={() => setSecondSurvey()}>
                  <button type="submit">Next</button>
                </div>
              </div>
            ) : (
              ""
            )}
            {survey === 2 ? (
              <div className="survey_2">
                <div className="survey_title">
                  <p>Who attracts you the most?</p>
                </div>
                <div className="genders_toggles">
                  <div className="my_gender_iden">
                    <div className="my_genderis">
                      <p>I am a:</p>
                      <div className="my_gender">
                        <MaleSvg
                          className={activeMale ? "male_active_svg" : ""}
                          onClick={() => toggleMyGender("male")}
                        />
                        <FamaleSvg
                          className={activeFaMale ? "famale_active_svg" : ""}
                          onClick={() => toggleMyGender("famale")}
                        />
                      </div>
                    </div>
                    <div className="error_gender">
                      {myGenderError ? <p>Select your gender</p> : ""}
                    </div>
                  </div>
                  <div className="seeking_gender_iden">
                    <div className="sheeking_genderis">
                      <p>Seeking a:</p>
                      <div className="my_gender">
                        <MaleSvg
                          className={
                            sheekingActiveMale ? "male_active_svg" : ""
                          }
                          onClick={() => toggleSeekingGender("male")}
                        />
                        <FamaleSvg
                          className={
                            sheekingActiveFaMale ? "famale_active_svg" : ""
                          }
                          onClick={() => toggleSeekingGender("famale")}
                        />
                      </div>
                    </div>
                    <div className="error_gender">
                      {seekingGenderError ? <p>Select your gender</p> : ""}
                    </div>
                  </div>
                </div>
                <div className="between_ages">
                  <p>Between ages:</p>
                  <select name="age" onChange={handleChange}>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                    <option value="61">61</option>
                    <option value="62">62</option>
                    <option value="63">63</option>
                    <option value="64">64</option>
                    <option value="65">65</option>
                    <option value="66">66</option>
                    <option value="67">67</option>
                    <option value="68">68</option>
                    <option value="69">69</option>
                    <option value="70">70</option>
                    <option value="71">71</option>
                    <option value="72">72</option>
                    <option value="73">73</option>
                    <option value="74">74</option>
                    <option value="75">75</option>
                    <option value="76">76</option>
                    <option value="77">77</option>
                    <option value="78">78</option>
                  </select>

                  <p>
                    <span>and</span>
                  </p>
                  <select name="age">
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                    <option value="61">61</option>
                    <option value="62">62</option>
                    <option value="63">63</option>
                    <option value="64">64</option>
                    <option value="65">65</option>
                    <option value="66">66</option>
                    <option value="67">67</option>
                    <option value="68">68</option>
                    <option value="69">69</option>
                    <option value="70">70</option>
                    <option value="71">71</option>
                    <option value="72">72</option>
                    <option value="73">73</option>
                    <option value="74">74</option>
                    <option value="75">75</option>
                    <option value="76">76</option>
                    <option value="77">77</option>
                    <option value="78">78</option>
                  </select>
                </div>
                <div className="take_chance" onClick={() => setThirdSurvey()}>
                  <button type="submit">Next</button>
                </div>
              </div>
            ) : (
              ""
            )}
            {survey === 3 ? (
              <div className="survey_2">
                <Modal userAge={userAge} />
              </div>
            ) : (
              ""
            )}

            <div className="agreement_policy">
              <p>
                By clicking "Take a Chance" you agree with the
                <span> Terms & Conditions</span> and{" "}
                <span>Privacy Policy </span>
                and <span>Refund and Cancellation Policy</span>.
              </p>
            </div>
          </div>
          <div className="right_img_circle">
            <div className="mob_circle_img">
              <img src={circle_mob} alt="circle_mob" />
            </div>
            <div className="circle_logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="circle_1">
              <img src={circle1} alt="circle1" />
            </div>
            <div className="circle_2">
              <img src={circle2} alt="circle2" />
            </div>
            <div className="circle_3">
              <img src={circle3} alt="circle3" />
            </div>
            <div className="circle_4">
              <img src={circle4} alt="circle4" />
            </div>
            <div className="circle_5">
              <img src={circle6} alt="circle5" />
            </div>
            <div className="circle_6">
              <img src={circle5} alt="circle6" />
            </div>
          </div>
        </div>
      </header>
      <footer>
        <div className="footer_list">
          <p>About</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Dating Securely</p>
        </div>
        <div className="footer_copyright">
          <p>COPYRIGHT STORYLOVES.NET 2023. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

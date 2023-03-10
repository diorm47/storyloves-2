import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import "./home-page.css";
import "./survey.css";

import axios from "axios";
import { ReactComponent as ManIcon } from "../assets/man.svg";
import { ReactComponent as Svg1 } from "../assets/svg1.svg";
import { ReactComponent as Svg2 } from "../assets/svg2.svg";
import { ReactComponent as Svg3 } from "../assets/svg3.svg";
import { ReactComponent as Svg4 } from "../assets/svg4.svg";
import { ReactComponent as Svg5 } from "../assets/svg5.svg";
import { ReactComponent as Svg6 } from "../assets/svg6.svg";
import { ReactComponent as Svg7 } from "../assets/svg7.svg";
import { ReactComponent as WomanIcon } from "../assets/woman.svg";
import Autocomplete from "../autocomplete/autocomplete";
import Quests from "../components/quests/quests";
import NeedntCityId from "../need-city-id/need-city-id";

function HomePage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [seconFieldActive, setSeconFieldActive] = useState(1);
  const [emailError, setEmailError] = useState(0);
  const [userName, setUserName] = useState();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const [userAge, setUserAge] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [needCityId, setKnow] = useState(false);
  const [ccode, setCcode] = useState("");

  const ref = useRef("");
  const [survey, setSurvey] = useState(1);
  const [whereYou, setWhereYou] = useState(1);
  const [ageSurveyIs, setAgeSurvey] = useState(0);
  const [kindSurveyIs, setkindSurveyIs] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [locationError, setlocationError] = useState(false);

  const secondSurveyActive = (props) => {
    setWhereYou(props);
    setSurvey(2);
  };

  const ThirdSurveyActive = (props) => {
    if (!userName) {
      setNameError(true);
    } else setSurvey(3);
  };

  const ageSurvey = (props) => {
    setAgeSurvey(props);
    setSurvey(4);
  };

  const kindSurvey = (props) => {
    setkindSurveyIs(props);
    setSurvey(5);
  };

  const myAgeSurvey = (props) => {
    if (!userAge) {
      setAgeError(true);
    } else setSurvey(6);
  };
  const getCountry = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "https://ipwho.is/",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);

    setCcode(response.data.country_code);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const needCity = async (ccode) => {
    let headersList = {
      Accept: "*/*",
    };
    let reqOptions = {
      url: `https://api.storyloves.net/need_city_id?country=${ccode}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setKnow(response.data);
  };

  const getcityId = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: `https://api.storyloves.net/suggest/city?ccode=${ccode}&query=${city}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    setCityId(response.data.suggestions[0]._id);
  };

  const firstField = (data) => {
    if (needCityId) {
      setCity(ref.current.state.userInput.split(",")[2].trim());

      getcityId();
      if (city) {
        setSurvey(7);
      } else {
      }
    } else {
      if (city) {
        setSurvey(7);
      } else {
      }
    }
  };

  const checkEmail = async (e) => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: `https://api.storyloves.net/registration/check/login/${e.target.value}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    if (response.data.error) {
      setEmailError(1);
    } else {
      setEmailError(2);
    }
  };

  const onSubmit = async (data) => {
    let params = new URL(document.location).searchParams;

    let formdata = new FormData();
    formdata.append("ccode", `${ccode}`);
    formdata.append("age", `${userAge}`);
    if (needCityId) {
      formdata.append("city_id", `${cityId}`);
      formdata.append("city", `${city}`);
    } else {
      formdata.append("city", `${city}`);
    }

    formdata.append("email", `${data.email}`);
    formdata.append("name", `${userName}`);
    formdata.append("password", `${data.password}`);
    if (params.get("source")) {
      formdata.append("source", `${params.get("source")}`);
      formdata.append("l", `${params.get("I")}`);
      formdata.append("platform", `${params.get("platform")}`);
      formdata.append("extwb", `${params.get("extwb")}`);
      formdata.append("adult", `${params.get("adult")}`);
      formdata.append("ukey", `${params.get("ukey")}`);
      formdata.append("subacc", `${params.get("subacc")}`);
      formdata.append("subid", `${params.get("subid")}`);
      formdata.append("app", `${params.get("app")}`);
      formdata.append("gaid", `${params.get("gaid")}`);
    }
    let bodyContent = formdata;
    let headersList = {
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
    };

    let reqOptions = {
      url: "https://api.storyloves.net/land-reg",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    if (emailError !== 1) {
      await axios.request(reqOptions).then((res) => {
        window.location.assign(
          `https://storyloves.net/land-login?activkey=${res.data.key}&email=${res.data.login}`
        );
      });
    }
  };

  useEffect(() => {
    getCountry();
    needCity(ccode);
  }, [ccode, needCity]);

  return (
    <>
      <header>
        <div className="header_wrapper">
          <div className="home_content">
            <div className="header_top">
              <div className="logo_img">
                <img src={logo} alt="logo" />
              </div>
            </div>

            <div className="changing_fields">
              {seconFieldActive === 1 ? (
                <div
                  className="first_screeen"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <h2>
                    THE LARGEST DATABASE OF <br /> DATING PROFILES
                  </h2>
                  <div className="select_gender">
                    <div
                      className="man_gender"
                      onClick={() => setSeconFieldActive(2)}
                    >
                      <ManIcon />
                      <p>I am a man</p>
                    </div>
                    <div
                      className="man_gender"
                      onClick={() => setSeconFieldActive(2)}
                    >
                      <WomanIcon />
                      <p>I am a woman</p>
                    </div>
                  </div>
                  <div className="first_screen_btm">
                    <p>
                      Please answer a few questions to find the perfect match
                      for you
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {seconFieldActive === 2 ? (
                <Quests setSeconFieldActive={setSeconFieldActive} />
              ) : (
                ""
              )}
              {seconFieldActive === 3 ? (
                <div className="survey_wrapper">
                  <div className="survey_progres">
                    <div className="icons_list">
                      <Svg1 className={survey >= 1 ? "active_icon" : ""} />
                      <Svg2 className={survey >= 2 ? "active_icon" : ""} />
                      <Svg3 className={survey >= 3 ? "active_icon" : ""} />
                      <Svg4 className={survey >= 4 ? "active_icon" : ""} />
                      <Svg5 className={survey >= 5 ? "active_icon" : ""} />
                      <Svg6 className={survey >= 6 ? "active_icon" : ""} />
                      <Svg7 className={survey >= 7 ? "active_icon" : ""} />
                    </div>
                    <div className="progres_line">
                      {survey === 1 ? (
                        <div className="progress_item"></div>
                      ) : (
                        ""
                      )}
                      {survey === 2 ? (
                        <div className="progress_item progress_item2"></div>
                      ) : (
                        ""
                      )}
                      {survey === 3 ? (
                        <div className="progress_item progress_item3"></div>
                      ) : (
                        ""
                      )}
                      {survey === 4 ? (
                        <div className="progress_item progress_item4"></div>
                      ) : (
                        ""
                      )}
                      {survey === 5 ? (
                        <div className="progress_item progress_item5"></div>
                      ) : (
                        ""
                      )}
                      {survey === 6 ? (
                        <div className="progress_item progress_item6"></div>
                      ) : (
                        ""
                      )}
                      {survey === 7 ? (
                        <div className="progress_item progress_item7"></div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {survey === 1 ? (
                    <div className="survey">
                      <div className="survey_title">
                        <p>Where are you looking for a match?</p>
                      </div>
                      <div className="survey_btns">
                        <div
                          onClick={() => secondSurveyActive(1)}
                          className={
                            whereYou === 1
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>in my city</p>
                        </div>
                        <div
                          onClick={() => secondSurveyActive(2)}
                          className={
                            whereYou === 2
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>in my country</p>
                        </div>
                        <div
                          onClick={() => secondSurveyActive(3)}
                          className={
                            whereYou === 3
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>in another country</p>
                        </div>
                        <div
                          onClick={() => secondSurveyActive(4)}
                          className={
                            whereYou === 4
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>it doesn't matter</p>
                        </div>
                      </div>
                      <div
                        className="back_btn"
                        onClick={() => setSeconFieldActive(1)}
                      >
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 2 ? (
                    <div className="survey_2">
                      <div className="survey_title">
                        <h4>What's your name?</h4>
                        <p>A real name is helpful in finding dates</p>
                      </div>
                      <div className="survey_name">
                        <input
                          type="text"
                          placeholder="Please enter your name"
                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        {nameError ? (
                          <p className="error_message">
                            * User name is required!
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="next_btn" onClick={ThirdSurveyActive}>
                        <button>Next</button>
                      </div>

                      <div className="back_btn" onClick={() => setSurvey(1)}>
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 3 ? (
                    <div className="survey">
                      <div className="survey_title">
                        <h4>
                          {userName}, women of what age are you interested in?
                        </h4>
                      </div>
                      <div className="survey_btns">
                        <div
                          onClick={() => ageSurvey(1)}
                          className={
                            ageSurveyIs === 1
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>18 - 25</p>
                        </div>
                        <div
                          onClick={() => ageSurvey(2)}
                          className={
                            ageSurveyIs === 2
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>25 - 35</p>
                        </div>
                        <div
                          onClick={() => ageSurvey(3)}
                          className={
                            ageSurveyIs === 3
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>35 - 45</p>
                        </div>
                        <div
                          onClick={() => ageSurvey(4)}
                          className={
                            ageSurveyIs === 4
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>45+</p>
                        </div>
                      </div>
                      <div className="back_btn" onClick={() => setSurvey(2)}>
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 4 ? (
                    <div className="survey">
                      <div className="survey_title">
                        <p>
                          {userName}, what kind of relationship are you looking
                          for right now?
                        </p>
                      </div>
                      <div className="survey_btns">
                        <div
                          onClick={() => kindSurvey(1)}
                          className={
                            kindSurveyIs === 1
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>talking and friendship</p>
                        </div>
                        <div
                          onClick={() => kindSurvey(2)}
                          className={
                            kindSurveyIs === 2
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>long-term relationship</p>
                        </div>
                        <div
                          onClick={() => kindSurvey(3)}
                          className={
                            kindSurveyIs === 3
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>dating and romance</p>
                        </div>
                        <div
                          onClick={() => kindSurvey(4)}
                          className={
                            kindSurveyIs === 4
                              ? "survey_answer active_answer"
                              : "survey_answer "
                          }
                        >
                          <p>creating a family</p>
                        </div>
                      </div>
                      <div className="back_btn" onClick={() => setSurvey(3)}>
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 5 ? (
                    <div className="survey_2">
                      <div className="survey_title">
                        <h4>Enter your age</h4>
                        <p>You must be at least 18 years old</p>
                      </div>

                      <div className="your_age">
                        <select
                          required
                          name="age"
                          onChange={(e) => setUserAge(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Your age
                          </option>
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
                      {ageError ? (
                        <p className="error_message">
                          * Age field is required!
                        </p>
                      ) : (
                        ""
                      )}

                      <div className="next_btn" onClick={myAgeSurvey}>
                        <button>Next</button>
                      </div>

                      <div className="back_btn" onClick={() => setSurvey(4)}>
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 6 ? (
                    <div className="survey_2">
                      <div className="survey_title">
                        <h4>Set your Location</h4>
                      </div>
                      <div className="survey_location">
                        {needCityId ? (
                          <>
                            <Autocomplete
                              getcityId={getcityId}
                              ref={ref}
                              setCcode={setCcode}
                              setKnow={setKnow}
                            />
                            {locationError ? (
                              <span>* Location is required</span>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <NeedntCityId
                              setCity={setCity}
                              setCcode={setCcode}
                            />
                            {locationError ? (
                              <span>* Location is required</span>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>

                      <div className="next_btn" onClick={firstField}>
                        <button>Next</button>
                      </div>

                      <div className="back_btn" onClick={() => setSurvey(5)}>
                        <p>Back</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {survey === 7 ? (
                    <div className="field_2">
                      <div className="survey_title">
                        <h4>Set your E-mail and Password</h4>
                      </div>
                      <form
                        onSubmit={handleSubmit2(onSubmit)}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <div
                          className="email_sign"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <input
                            type="email"
                            placeholder="Your Email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            {...register2("email", { required: true })}
                            onChange={(e) => checkEmail(e)}
                          />
                          {errors2.email && <span>* Email is required</span>}
                          {emailError === 1 ? (
                            <span> Email is already exist or invalid</span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="password_sign">
                          <input
                            placeholder="Password"
                            type="password"
                            {...register2("password", {
                              required: true,
                              minLength: 6,
                            })}
                          />
                          {errors2.password && (
                            <span>
                              * Password is required minimum 6 symbols
                            </span>
                          )}
                        </div>

                        <div className="next_btn" onClick={firstField}>
                          <button>Next</button>
                        </div>
                        <div className="back_btn" onClick={() => setSurvey(6)}>
                          <p>Back</p>
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </header>
      <footer>
        <div className="footer_menu_list">
          <p>About the Project</p>
          <p>Customer Support</p>
          <p>Tips</p>
          <p>Contacts</p>
          <p>User Agreement</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer_copyright">
          <p>COPYRIGHT STORYLOVES.NET 2023. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

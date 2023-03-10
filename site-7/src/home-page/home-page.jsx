import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import Autocomplete from "../autocomplete/autocomplete";
import NeedntCityId from "../need-city-id/need-city-id";
import Survey from "../survey/survey";
import "./home-page.css";

function HomePage() {
  let scrollTTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [locationError, setLocationError] = useState(false);
  const [seconFieldActive, setSeconFieldActive] = useState(0);
  const [emailError, setEmailError] = useState(0);
  const [ccode, setCcode] = useState("");
  const [city, setCity] = useState();
  const [needCityId, setKnow] = useState(true);
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userAge, setUserAge] = useState();
  const [userName, setUserName] = useState();

  const [cityId, setCityId] = useState();

  const ref = useRef("");

  const getcityId = async () => {
    let city = ref.current.state.userInput.split(",")[2].trim();
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

  const firstField = (data) => {
    if (needCityId) {
      getcityId();
      if (ref.current.state.userInput) {
        setLocationError(false);
        setSeconFieldActive(2);
        setUserAge(data.age);
        setUserName(data.name);
      } else {
        setLocationError(true);
      }
    } else {
      if (city) {
        setUserAge(data.age);
        setUserName(data.name);
        setSeconFieldActive(2);
      } else {
        setLocationError(true);
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
    if (needCityId) {
      if (ref.current.state.userInput) {
        setLocationError(false);
      } else {
        setLocationError(true);
      }
    }
    let params = new URL(document.location).searchParams;

    let formdata = new FormData();
    formdata.append("ccode", `${ccode}`);
    formdata.append("age", `${userAge}`);
    if (needCityId) {
      formdata.append("city_id", `${cityId}`);
      formdata.append("city", `${ref.current.state.userInput}`);
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
          <div
            className="header_top_text"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div className="topper_text">
              <p>Our #1 Recommended Dating Site!</p>
            </div>
            <div className="bottom_of_topper">
              <p>Trusted. Effective. Confidential.</p>
            </div>
            <div className="top_bar_logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div
            className="home_content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="left_default_text">
              <h1>The Exclusive Dating Site For Single Adults</h1>
              <i>Free registration for qualifying singles age 40+</i>
            </div>
            <div className="changing_fields">
              {seconFieldActive === 0 ? (
                <Survey setSeconFieldActive={setSeconFieldActive} />
              ) : (
                ""
              )}
              <div
                className={
                  seconFieldActive === 1 ? "field_1" : "field_1 block_field_1"
                }
              >
                <form onSubmit={handleSubmit(firstField)}>
                  <div className="your_age">
                    <select
                      required
                      name="age"
                      {...register("age", { required: true })}
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
                    {errors.age && <span>* Age is required</span>}
                  </div>
                  <div className="your_name">
                    <input
                      type="text"
                      placeholder="Your Name"
                      pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                      {...register("name", { required: true })}
                    />
                    {errors.name && <span>* Name is required</span>}
                  </div>
                  <div className="your_city">
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
                        <NeedntCityId setCity={setCity} setCcode={setCcode} />
                        {locationError ? (
                          <span>* Location is required</span>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>

                  <div className="submit_btn">
                    <button>Next</button>
                  </div>
                </form>
              </div>
              <div
                className={
                  seconFieldActive === 2 ? "field_2" : "field_2 block_field_1"
                }
              >
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
                      <span>* Password is required minimum 6 symbols</span>
                    )}
                  </div>

                  <div className="submit_btn_2_field">
                    <button>Join Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="second_display">
        <div
          className="section_text"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <img src={logo} alt="logo" />
          <p>
            <i>
              Kindred Connect is proud to be a Singles50 affiliate and they are
              our #1 <br /> recommended dating site for singles age 40+!
            </i>
          </p>
          <p>
            <span onClick={scrollTTop}>Click here </span> to register now!
          </p>
        </div>
      </section>
      <footer>
        <div className="footer_menu">
          <p>Terms & Conditions</p>
          <p>Privacy</p>
          <p>Contact Us</p>
        </div>
        <div className="nav_copyritght">
          <p>
            COPYRIGHT{" "}
            <a target="blank" href="https://storyloves.net">
              STORYLOVES.NET
            </a>{" "}
            2023. <br />
            ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

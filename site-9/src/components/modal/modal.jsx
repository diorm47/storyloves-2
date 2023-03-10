import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./modal.css";

import axios from "axios";
import Autocomplete from "../../autocomplete/autocomplete";
import NeedntCityId from "../../need-city-id/need-city-id";

function Modal({ userAge }) {
  const [locationError, setLocationError] = useState(false);
  const [seconFieldActive, setSeconFieldActive] = useState(1);
  const [emailError, setEmailError] = useState(0);
  const [ccode, setCcode] = useState("");
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

  // const [userAge, setUserAge] = useState();
  const [userName, setUserName] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [needCityId, setKnow] = useState(false);
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
        setUserName(data.name);
      } else {
        setLocationError(true);
      }
    } else {
      if (city) {
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
    <div className="modal_block">
      <div className="changing_fields">
        <div
          className={
            seconFieldActive === 1 ? "field_1" : "field_1 block_field_1"
          }
        >
          <form onSubmit={handleSubmit(firstField)}>
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
                  {locationError ? <span>* Location is required</span> : ""}
                </>
              ) : (
                <>
                  <NeedntCityId setCity={setCity} setCcode={setCcode} />
                  {locationError ? <span>* Location is required</span> : ""}
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
  );
}

export default Modal;

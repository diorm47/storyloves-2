import React, { Component, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./modal.css";

import PropTypes from "prop-types";
import axios from "axios";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      countryCode: "US",
    };
  }

  getCountry = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let reqOptions = {
      url: "http://ipwho.is/",
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);

    this.setState({
      countryCode: response.data.country_code,
    });
    this.props.setCcode(response.data.country_code);
  };
  componentDidMount() {
    this.getCountry();
  }
  getData = [];
  setSuggestions = async (props) => {
    let headersList = {
      Accept: "*/*",
    };
    let reqOptions = {
      url: `https://api.storyloves.net/suggest/city?ccode=${this.state.countryCode}&query=${props}`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    this.getData = response.data.suggestions.map(
      (arr) => `${arr.country}, ${arr.administratives[0].name}, ${arr.name}`
    );
  };

  onChange = (e) => {
    const userInput = e.currentTarget.value;
    this.setSuggestions(userInput);
    const filteredSuggestions = this.getData;

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder="Location"
        />
        {suggestionsListComponent}
      </>
    );
  }
}
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

  const firstField = (data) => {
    getcityId();
    if (ref.current.state.userInput) {
      setLocationError(false);
      setSeconFieldActive(2);
    } else {
      setLocationError(true);
    }
    // setUserAge(data.age);
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
    formdata.append("city", `${ref.current.state.userInput}`);
    formdata.append("age", `${userAge}`);
    formdata.append("city_id", `${cityId}`);
    formdata.append("email", `${data.email}`);
    formdata.append("name", `${data.name}`);
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
              <Autocomplete
                getcityId={getcityId}
                ref={ref}
                setCcode={setCcode}
              />
              {locationError ? <span>* Location is required</span> : ""}
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

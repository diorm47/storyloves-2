import React, { Component, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import "./home-page.css";
import logo from "../assets/logo.png";

import { ReactComponent as Svg_1 } from "../assets/logo-1.svg";
import { ReactComponent as Svg_2 } from "../assets/logo-2.svg";
import { ReactComponent as Svg_3 } from "../assets/logo-3.svg";
import { ReactComponent as Svg_4 } from "../assets/logo-4.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as ArrowBack } from "../assets/arrow-back.svg";
import bot from "../assets/bot.png";

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
      url: "https://ipwho.is/",
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
          placeholder="Localización"
        />
        {suggestionsListComponent}
      </>
    );
  }
}

function HomePage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [locationError, setLocationError] = useState(false);
  const [seconFieldActive, setSeconFieldActive] = useState(1);
  const [emailError, setEmailError] = useState(0);
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
  const [city, setCity] = useState("");
  const [userDay, setUserDay] = useState();
  const [userMonth, setUserMonth] = useState();
  const [myMess_1, setmyMess_1] = useState("");
  const [myMess_2, setmyMess_2] = useState("");
  const [userName, setUserName] = useState();
  const [cityId, setCityId] = useState();
  const [ccode, setCcode] = useState("");

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
      setSeconFieldActive(4);
      setCity(ref.current.state.userInput);
    } else {
      setLocationError(true);
    }

    setUserName(data.name);
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
    formdata.append("city", `${city}`);
    formdata.append("age", `${userAge}`);
    formdata.append("city_id", `${cityId}`);
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

  return (
    <>
      <header>
        <div className="header_wrapper">
          <div
            className="home_content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="left_default_text">
              <div className="header_logo">
                <img src={logo} alt="logo" />
              </div>
              <h1>Serious Dating, Crazy Love</h1>
            </div>
            <div className="changing_fields">
              {seconFieldActive === 1 ? (
                <div className="bot_messs">
                  <div
                    className="bot_mess"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <img src={bot} alt="bot-img" />
                    <div className="mess_wrapper">
                      <p>
                        Hola, soy la coach de StoryLoves.
                        <br />
                        <span>¿Qué estás buscando?</span>
                      </p>
                    </div>
                  </div>
                  {myMess_1 !== "" ? (
                    <div className="my_messs">
                      <div className="my_messes">
                        <div className="my_mess">
                          <input
                            type="radio"
                            id="hombre"
                            checked={myMess_1 === "hombre"}
                            onClick={() => setmyMess_1("hombre")}
                          />
                          <label htmlFor="hombre">Un hombre</label>
                        </div>
                        <div className="my_mess">
                          <input
                            type="radio"
                            id="mujer"
                            checked={myMess_1 === "mujer"}
                            onClick={() => setmyMess_1("mujer")}
                          />
                          <label htmlFor="mujer">Una mujer</label>
                        </div>
                        <div className="my_mess">
                          <input
                            type="radio"
                            id="mundo"
                            checked={myMess_1 === "mundo"}
                            onClick={() => setmyMess_1("mundo")}
                          />
                          <label htmlFor="mundo">Todo el mundo</label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {myMess_1 !== "" ? (
                    <div
                      className="bot_mess"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <img src={bot} alt="bot-img" />
                      <div className="mess_wrapper">
                        <p>
                          <span>¿Eres hombre o mujer?</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {myMess_2 !== "" ? (
                    <div className="my_messs">
                      <div className="my_messes">
                        <div className="my_mess">
                          <input
                            type="radio"
                            id="hombre2"
                            checked={myMess_2 === "hombre2"}
                            onClick={() => setmyMess_2("hombre2")}
                          />
                          <label htmlFor="hombre2">Soy un hombre</label>
                        </div>
                        <div className="my_mess">
                          <input
                            type="radio"
                            id="mujer2"
                            checked={myMess_2 === "mujer"}
                            onClick={() => setmyMess_2("mujer")}
                          />
                          <label htmlFor="mujer2">Soy una mujer</label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="bottom_quests">
                    {myMess_1 === "" ? (
                      <div
                        className="bottom_quest"
                        onClick={() => setmyMess_1("hombre")}
                      >
                        <p>Un hombre</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {myMess_2 === "" ? (
                      <div
                        className="bottom_quest"
                        onClick={() => setmyMess_2("mujer")}
                      >
                        <p>Una mujer</p>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="bottom_quest">
                      {myMess_2 !== "" ? (
                        <p onClick={() => setSeconFieldActive(2)}>Continuar</p>
                      ) : (
                        <p>Todo el mundo</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {seconFieldActive === 2 ? (
                <div className="survey_steps">
                  <div className="s_step_1">
                    <div className="bot_mess">
                      <img src={bot} alt="bot-img" />
                      <div className="mess_wrapper">
                        <p>
                          Para poder mostrarte los perfiles que mejor encajan
                          contigo, ¿puedes darnos tu
                          <span> fecha de nacimiento?</span>
                        </p>
                      </div>
                    </div>

                    <div className="set_my_age">
                      <select
                        className="b_day"
                        onChange={(e) => setUserDay(e.target.value)}
                      >
                        <option disabled="" value="0">
                          Día
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
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
                      </select>

                      <select
                        className="b_month"
                        onChange={(e) => setUserMonth(e.target.value)}
                      >
                        <option disabled="" value="0">
                          Mes
                        </option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </select>

                      <select
                        className="b_year"
                        onChange={(e) => setUserAge(e.target.value)}
                      >
                        <option disabled selected>
                          Año
                        </option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        <option value="1999">1999</option>
                        <option value="1998">1998</option>
                        <option value="1997">1997</option>
                        <option value="1996">1996</option>
                        <option value="1995">1995</option>
                        <option value="1994">1994</option>
                        <option value="1993">1993</option>
                        <option value="1992">1992</option>
                        <option value="1991">1991</option>
                        <option value="1990">1990</option>
                        <option value="1989">1989</option>
                        <option value="1988">1988</option>
                        <option value="1987">1987</option>
                        <option value="1986">1986</option>
                        <option value="1985">1985</option>
                        <option value="1984">1984</option>
                        <option value="1983">1983</option>
                        <option value="1982">1982</option>
                        <option value="1981">1981</option>
                        <option value="1980">1980</option>
                        <option value="1979">1979</option>
                        <option value="1978">1978</option>
                        <option value="1977">1977</option>
                        <option value="1976">1976</option>
                        <option value="1975">1975</option>
                        <option value="1974">1974</option>
                        <option value="1973">1973</option>
                        <option value="1972">1972</option>
                        <option value="1971">1971</option>
                        <option value="1970">1970</option>
                        <option value="1969">1969</option>
                        <option value="1968">1968</option>
                        <option value="1967">1967</option>
                        <option value="1966">1966</option>
                        <option value="1965">1965</option>
                        <option value="1964">1964</option>
                        <option value="1963">1963</option>
                        <option value="1962">1962</option>
                        <option value="1961">1961</option>
                        <option value="1960">1960</option>
                        <option value="1959">1959</option>
                        <option value="1958">1958</option>
                        <option value="1957">1957</option>
                        <option value="1956">1956</option>
                        <option value="1955">1955</option>
                        <option value="1954">1954</option>
                        <option value="1953">1953</option>
                        <option value="1952">1952</option>
                        <option value="1951">1951</option>
                        <option value="1950">1950</option>
                        <option value="1949">1949</option>
                        <option value="1948">1948</option>
                        <option value="1947">1947</option>
                        <option value="1946">1946</option>
                        <option value="1945">1945</option>
                        <option value="1944">1944</option>
                        <option value="1943">1943</option>
                        <option value="1942">1942</option>
                        <option value="1941">1941</option>
                        <option value="1940">1940</option>
                        <option value="1939">1939</option>
                        <option value="1938">1938</option>
                        <option value="1937">1937</option>
                        <option value="1936">1936</option>
                        <option value="1935">1935</option>
                        <option value="1934">1934</option>
                        <option value="1933">1933</option>
                        <option value="1932">1932</option>
                        <option value="1931">1931</option>
                        <option value="1930">1930</option>
                        <option value="1929">1929</option>
                        <option value="1928">1928</option>
                        <option value="1927">1927</option>
                        <option value="1926">1926</option>
                        <option value="1925">1925</option>
                        <option value="1924">1924</option>
                        <option value="1923">1923</option>
                      </select>
                      {!userAge || !userMonth || !userDay ? (
                        <div className="next_blck">
                          <button>
                            <Arrow />
                          </button>
                        </div>
                      ) : (
                        <div className="next_blck_active">
                          <button onClick={() => setSeconFieldActive(3)}>
                            <Arrow />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="survey_progress">
                    <div
                      className="prev_btn"
                      onClick={() => setSeconFieldActive(1)}
                    >
                      <ArrowBack />
                    </div>
                    <div className="surv_progress">
                      <div className="progress_id"></div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {seconFieldActive === 3 ? (
                <>
                  <div
                    className="bot_mess"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <img src={bot} alt="bot-img" />
                    <div className="mess_wrapper">
                      <p>
                        Vale, así que tienes {2023 - userAge} años.
                        <span>
                          ¿Podrías indicarme tu nombre? y ¿dónde vives?
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="field_1"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <form onSubmit={handleSubmit(firstField)}>
                      <div className="your_name">
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                          {...register("name", { required: true })}
                        />
                        {errors.name && <span>* Se requiere el nombre</span>}
                      </div>
                      <div className="your_city">
                        <Autocomplete
                          getcityId={getcityId}
                          ref={ref}
                          setCcode={setCcode}
                        />
                        {locationError ? (
                          <span>* Se requiere ubicación</span>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="submit_btn">
                        <button>Próximo</button>
                      </div>
                    </form>
                    <div className="survey_progress">
                      <div
                        className="prev_btn"
                        onClick={() => setSeconFieldActive(2)}
                      >
                        <ArrowBack />
                      </div>
                      <div className="surv_progress">
                        <div className="progress_id"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {seconFieldActive === 4 ? (
                <>
                  <div
                    className="bot_mess"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <img src={bot} alt="bot-img" />
                    <div className="mess_wrapper">
                      <p>
                        ¡He encontrado solteros cerca de ti ❤️! Para ver sus
                        perfiles, te crearé gratis una cuenta en StoryLoves.
                        ¿Podrías darme
                        <span> tu email?</span>
                        ¿Podrías escoger <span>una contraseña?</span>
                      </p>
                    </div>
                  </div>
                  <div className="field_2">
                    <form
                      onSubmit={handleSubmit2(onSubmit)}
                      data-aos="fade-up"
                      data-aos-duration="500"
                    >
                      <div
                        className="email_sign"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <input
                          type="email"
                          placeholder="Tu email"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          {...register2("email", { required: true })}
                          onChange={(e) => checkEmail(e)}
                        />
                        {errors2.email && (
                          <span>* Correo email es requerido</span>
                        )}
                        {emailError === 1 ? (
                          <span> El correo email ya existe o no es válido</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="password_sign">
                        <input
                          placeholder="Contraseña"
                          type="password"
                          {...register2("password", {
                            required: true,
                            minLength: 6,
                          })}
                        />
                        {errors2.password && (
                          <span>
                            * Se requiere contraseña mínimo 6 símbolos
                          </span>
                        )}
                      </div>

                      <div className="submit_btn_2_field">
                        <button>Únete ahora</button>
                      </div>
                    </form>
                    <div className="survey_progress">
                      <div
                        className="prev_btn"
                        onClick={() => setSeconFieldActive(3)}
                      >
                        <ArrowBack />
                      </div>
                      <div className="surv_progress">
                        <div className="progress_id"></div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </header>
      <section className="second_display">
        <div className="secondary_wrapper">
          <div className="sectiion_svg_list">
            <div className="list_item">
              <Svg_1 />
              <p>
                Encuentra los solteros <br /> más comprometidos**
              </p>
            </div>
            <div className="list_item">
              <Svg_2 />
              <p>
                Perfiles detallados, búsqueda <br /> por criterios y
                geolocalización
              </p>
            </div>
            <div className="list_item">
              <Svg_3 />
              <p>
                Eventos temáticos para tener <br /> citas inolvidables
              </p>
            </div>
            <div className="list_item">
              <Svg_4 />
              <p>El servicio de citas más serio**</p>
            </div>
          </div>
          <div className="recomend_block">
            <h2>Recomendado por los solteros de StoryLoves</h2>
            <div className="rec_text">
              <h3>Una aplicación de citas en la que puedes confiar</h3>
              <p>
                Todos los días, miles de solteros confían en StoryLoves. Su
                opinión nos importa y estamos encantados de compartirla contigo.
                1 de cada 4 personas conoce una pareja creada gracias a
                StoryLoves
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer_menu">
          <p>Condiciones generales Eventos</p>
          <p>Política de privacidad</p>
          <p>Condiciones Generales</p>
          <p> Directrices comunitarias</p>
          <p>Consejos de seguridad</p>
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

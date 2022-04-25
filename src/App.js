import React from "react";
import "./App.css";

import Form from "./components/Form";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import "bootstrap/dist/css/bootstrap.min.css";

//gick ej med .env
const Api_Key = "9e12aabdcf0f7546ef367642fbb2cabd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      timezone: undefined,
      description: "",
      error: false,
      renderForecast: 0,
      apikey: Api_Key,
      cnt: undefined,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#133337";
  }
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  getWeek = async (e) => {
    e.preventDefault();
  };

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if (city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,

        error: false,
      });

      // ikoner
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };
  forceRefresh = (e) => {
    window.location.reload(e);
  };
  clickBtn = (e) => {
    this.setState({
      renderForecast: 1,
    });
  };
  render() {
    let comp;
    if (this.state.renderForecast == 1) {
      comp = (
        <Forecast
          city={this.state.city}
          apikey={this.state.apikey}
          temprature={this.state.temprature}
        />
      );
    }
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />

        <button
          className="btn btn-primary"
          style={{
            marginLeft: "2px",
            justifyContent: "flex-end",
          }}
          onClick={this.clickBtn}
        >
          Get Forecast
        </button>

        {comp}
      </div>
    );
  }
}

export default App;

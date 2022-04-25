import React from "react";

import "./Style.css";

const cnt = 5;
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveDays: null,
    };

    console.log(props.city, props.apikey);

    if (props.city && props.apikey) {
      this.getForecast(props.city, props.apikey);
    }
  }

  getForecast = async (city, Api_Key) => {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${Api_Key}`
    );
    const response = await result.json();
    var tmp = "";
    var fiveDaysWeather = [];

    // Tar ut förenklad prognos för fenm dagar
    response.list.forEach((item) => {
      if (tmp != item.dt_txt.substring(0, 10)) {
        fiveDaysWeather.push(item);
      }
      tmp = item.dt_txt.substring(0, 10);
    });

    this.setState({
      fiveDays: fiveDaysWeather,
    });

    fiveDaysWeather.forEach((item) => {});
  };

  render() {
    const items = [];

    if (this.state.fiveDays != null) {
      for (const [index, item] of this.state.fiveDays.entries()) {
        items.push(
          <div className="container">
            <div className="Card">
              <h2 className="text-white py3">{item.dt_txt.substring(0, 10)}</h2>
              <h4 className="text-white py-2">
                {Math.floor(item.main.temp - 273.15)} C°
              </h4>
              <h4 className="text-white py-2">{item.weather[0].description}</h4>
            </div>
          </div>
        );
      }
    }

    return (
      <div
        className="container-forecast"
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10rem",
        }}
      >
        {items}
      </div>
    );
  }
}
export default Forecast;

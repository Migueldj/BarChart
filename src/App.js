import React, { useState, useEffect, useRef } from "react";
import "./Styles/App.css";


import { Chart } from "react-google-charts";

import { Filter } from "./Components/Filter";
import { Download } from "./Components/Download";

import { getData } from "./API/api";

import MAIN from "./Assets/main-icon.svg"

const headers = ["Ciudad", "Servicios Diarios", "Meta"];
const options = {
  title: "Comparación Servicios Diarios - Meta Por Ciudad",
  chartArea: { width: "50%" },
  colors: ["#B0D9FF", "#156BBB"],
  hAxis: {
    title: "Cantidad de servicios",
    minValue: 0,
  },
  vAxis: {
    title: "Ciudad",
  },
  legend: { position: "bottom" },
};

let cities = ['Mexico','Monterrey','Guadalajara','Puebla','Tijuana','Toluca','Ciudad Juarez']
let daily = [9,1,4,8,5,10,7]
let goal = [15,10,10,8,8,9,10,9]
let data = {
    "cities": cities,
    "daily":daily,
    "goal": goal
}

function App() {
  const [info, setInfo] = useState([]);
  const [filters, setFilters] = useState([]);

  const chart = useRef(null);

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    try {
      const info = cleanDataReceived(data);
      setInfo(info);
      setFilters(info);
    } catch (error) {
      console.log(error);
    }
  }

  const cleanDataReceived = ({ cities, daily, goal }) => {
    let cleanedData = [...cities].map((city, i) => {
      const aux = [city, daily[i], goal[i]];
      return aux;
    });
    return cleanedData;
  };

  

  return (
    <>
      <div className="title d-flex align-items-center justify-content-center">
        <img src={MAIN} alt="image" width={30} className={"margin-button"}/>
        <p class="h1">Bar Chart</p>
      </div>
      <div className="d-flex flex-column flex-lg-row margin-main">
        <Filter filters={filters} info={info} setFilters={setFilters} />
        {filters.length > 0 ? (
            <div className="flex-fill chart" ref={chart}>
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={[headers, ...filters]}
                options={options}
              />
            </div>
        ) : (
          <div className="no-info d-flex align-items-center justify-content-center py-1 px-2 ">
            <div>
              <img src={MAIN} alt="image" width={200} className="mt-2"/>
              <p>Selecciona alguna ciudad para ver su gráfica</p>
            </div>
          </div>
        )}
      </div>
      {filters.length > 0 && <Download chart={chart}/>}
    </>
  );
}

export default App;

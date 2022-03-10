import React, { useState, useEffect } from "react";

import ARROW from "../Assets/dropdown-icon.svg";

export const Filter = ({ filters, setFilters, info }) => {
  const [checked, setChecked] = useState([]);
  const [dropDownActive, setDropDownActive] = useState(true);

  let { matches } = window.matchMedia("(max-width: 992px)");

  useEffect(() => {
    setChecked(new Array(info.length).fill(true));
  }, [info]);

  const handleOnChange = (position) => {
    const updatedChecked = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedChecked);

    if (filters.includes(info[position])) {
      let aux = filters.filter((el) => {
        return el != info[position];
      });
      setFilters(aux);
    } else {
      setFilters([...filters, info[position]]);
    }
  };

  return (
    <>
      <div className="d-flex align-items-start">
        <div className="filter w-100 py-4 px-4">
          <div className="d-flex justify-content-between align-items-center">
            <p className="h5 margin-button">Filtrar:</p>
            <img
              src={ARROW}
              alt="arrow"
              width={15}
              className={dropDownActive ? "mt-1 rotate-180" : "mt-1"}
              onClick={() => setDropDownActive(!dropDownActive)}
            />
          </div>
          {dropDownActive ? (
            <>
              <div className="d-flex align-content-center mb-1 mt-2" key={"Todas"}>
                <input
                  onChange={() => {
                    setFilters(info);
                    setChecked(new Array(info.length).fill(true));
                  }}
                  checked={filters.length == info.length}
                  type="checkbox"
                  className="checkB"
                  id={"Todas"}
                  name={"Todas"}
                  value={"Todas"}
                />
                <label htmlFor={"Todas"}>{"Todas"}</label>
              </div>
              <div>
                {info.map((city, index) => {
                  return (
                    <div
                      className="d-flex align-content-center mb-1"
                      key={index}
                    >
                      <input
                        onChange={() => handleOnChange(index)}
                        checked={checked[index]}
                        type="checkbox"
                        className="checkB"
                        id={city[0]}
                        name={city[0]}
                        value={city[0]}
                      />
                      <label htmlFor={city[0]}>{city[0]}</label>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import "./App.css";
import ico from "./assets/images/icon-arrow.svg";
import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { style } from "motion/react-client";

function App() {
  const [days, setDays] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [objtError, setObjtError] = useState({});
  const [result, setResult] = useState({ days: 0, month: 0, year: 0 });

  const handleDays = (e) => {
    setDays(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const validEmptyField = () => {
    const newErrors = {};
    //validando el campo del día

    if (!days.trim()) {
      newErrors.dayError = "Ingresa el día :)";
    } else if (!/^\d*$/.test(days)) {
      newErrors.dayError = "Solo puedes ingresar números aquí :(";
    } else if (days < 1 || days > 31) {
      // objl.day = days;
      // const { dayError, ...rest } = objtError;
      // setObjtError(rest);
      newErrors.dayError = "El día ingresado no es válido :(";
    }

    //validando el campo del mes

    if (!month.trim()) {
      newErrors.monthError = "Ingresa el mes:(";
      // objl.month = month;
      //  const { monthError, ...rest } = objtError;
      //  setObjtError(rest);
    } else if (!/^\d*$/.test(month)) {
      newErrors.monthError = "Solo puedes ingresar números aquí :(";
    } else if (month < 1 || month > 12) {
      newErrors.monthError = "El mes ingresado no es válido :(";
    }

    //validando el campo del año
    let date = new Date();
    let currentYear = date.getFullYear();
    if (!year.trim()) {
      newErrors.yearError = "Ingresa el año :(";
    } else if (!/^\d*$/.test(year)) {
      newErrors.yearError = "Solo puedes ingresar números aquí :(";
    } else if (year >= parseInt(currentYear) || year.length != 4) {
      newErrors.yearError = "El año ingresado no es válido :(";
      // objl.year = years;
      //const { yearError, ...rest } = objtError;
      //setObjtError(rest);
    }

    // if (Object.keys(objl).length === 3 && Object.keys(objtError).length === 0) {
    //   paintResult(objl);
    // console.log(objtError);
    // }
    console.log(newErrors, "newerror");
    setObjtError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      paintResult(days, month, year);
    } else {
      console.log(
        "Hay errores en los valores de los campos",
        "background-color:red;color:#fff;padding: 5px 10px;"
      );
    }
  };

  function paintResult(day, month, year) {
    let date1 = new Date(`${year}/${month}/${day}`);
    let dateNow = new Date();
    let resta = dateNow.getTime() - date1.getTime();
    let result = resta / (1000 * 60 * 60 * 24);

    let resY = result / 365; //3
    console.log(resY);
    let resM = (result / 365 - Math.floor(resY)) * 12;
    console.log(resM);
    let resD = (resM - Math.floor(resM)) * 31;
    console.log(resD);

    setResult({
      year: Math.floor(resY),
      month: Math.floor(resM),
      days: Math.floor(resD),
    });
  }

  return (
    <div className=" h-full w-full grid p-4 place-content-center">
      <motion.section
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white px-8 py-12 w-[300px]  rounded-3xl shadow-lg  sm:rounded-br-[40%] sm:w-[400px] md:rounded-br-[40%] lg:rounded-br-[40%] xl:rounded-br-[40%] 2xl:rounded-br-[40%]"
      >
        <div className="section-inputs ">
          <div className="inputs grid mb-8 grid-cols-1 w-full text-2xl gap-7 sm:grid-cols-3 ">
            <label
              htmlFor="days"
              id="label-days"
              className="flex flex-col place-items-center gap-2 text-neutral-400 sm:h-36"
            >
              <span className={objtError.dayError?"text-red-400 font-bold":"text-neutral-400 font-bold "}>DAY</span>
              <input
                type="text"
                className={`focus:outline-2 text-neutral-800 focus:outline-offset-2 focus:outline-salid focus:outline-purple-600 font-bold border border-neutral-400 text-center transition delay-150 p-2 duration-150 w-1/2 focus:border focus:border-purple-600 rounded-lg sm:w-full ${objtError.dayError?"border-red-400 border-2":"border-neutral-400"}`} 
                name="days"
                id="inputDays"
                placeholder="DD"
                value={days}
                maxLength="2"
                onChange={handleDays}
              />
                 {objtError.dayError && <motion.div  initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }} className="">
            <p className="text-red-400 text-[10px] font-bold">
                {objtError.dayError}
              </p>
            </motion.div>}
            </label>
            <label
              htmlFor="
              month"
              id="label-month"
              className="  flex flex-col place-items-center gap-2 text-neutral-400 sm:h-36"
            >
              <span className={objtError.monthError?"text-red-400 font-bold":"text-neutral-400 font-bold"}> MONTH</span>
              <input
                type="text"
                name="month"
                className={`focus:outline-2 focus:outline-offset-2 text-neutral-800 focus:outline-salid focus:outline-purple-600 font-bold border border-neutral-400 text-center transition delay-150 p-2 duration-150 w-1/2 focus:border focus:border-purple-600 rounded-lg sm:w-full  ${objtError.monthError?"border-red-400 border-2":"border-neutral-400"}`}
                id="inputMonth"
                placeholder="MM"
                value={month}
                maxLength="2"
                onChange={handleMonth}
              />

              {objtError.monthError && <motion.div  initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }} className="">
            <p className="text-red-400 text-[10px] font-bold">
                {objtError.monthError}
              </p>
            </motion.div>}
            
            </label>
            <label
              htmlFor="
            years"
              id="label-years"
              className=" flex flex-col place-items-center gap-2 text-neutral-400 sm:h-36"
            >
              <span className={objtError.yearError?"text-red-400 font-bold":"text-neutral-400 font-bold "}>YEAR</span>
              <input
                type="text"
                className={`focus:outline-2 text-neutral-800 focus:outline-offset-2 focus:outline-salid focus:outline-purple-600 font-bold border border-neutral-400 text-center transition delay-150 p-2 duration-150 w-1/2 focus:border focus:border-purple-600 rounded-lg sm:w-full  ${objtError.monthError?"border-red-400 border-2":"border-neutral-400"}`}
                name="years"
                id="inputYears"
                placeholder="YYYY"
                value={year}
                maxLength="4"
                onChange={handleYear}
              />
                  {objtError.yearError && <motion.div  initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }} className="">
            <p className="text-red-400 text-[10px] font-bold">
                {objtError.yearError}
              </p>
            </motion.div>}
            </label>
          </div>

          <div className="section-icon relative h-10 mb-20 border-b-1 border-b-gray-400">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className=" absolute grid bottom-[calc(50%-55px)] left-[calc(50%-25px)] place-items-center rounded-full size-25  bg-gradient-to-r from-purple-500 via-purple-700 to-purple-800 hover:bg-gradient-to-br  hover:cursor-pointer hover:bg-black shadow-[0px_0px_0px_15px_rgb(255,255,255)] animate-bounce hover:animate-none"
              onClick={validEmptyField}
            >
              <img className="size-10" src={ico} alt="" />
            </motion.div>
          </div>
        </div>

        <div className="text-left text-6xl  font-bold text-neutral-900 sm:flex sm:flex-col ">
          <div className="h-[58px]  flex items-center gap-3">
            <span className="text-purple-600 p-0 drop-shadow-xl">
              {result.year != 0 ? (
                <NumberFlow value={Number(result.year)} />
              ) : (
                "--"
              )}
            </span>{" "}
            <p className="italic">years</p>
          </div>
          <div className="h-[58px] flex items-center gap-3">
            <span className="text-purple-600 p-0 drop-shadow-xl">
              {result.month !== 0 ? (
                <NumberFlow value={Number(result.month)} />
              ) : (
                "-- "
              )}
            </span>
            {"   "}
            <p className="italic"> months</p>
          </div>
          <div className="h-[58px] flex items-center gap-3">
            <span className="text-purple-600 p-0 m-0 drop-shadow-xl">
              {result.days !== 0 ? (
                <NumberFlow value={Number(result.days)} />
              ) : (
                "--"
              )}
            </span>{" "}
            <p className="italic">days</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className=" bg-red-500 px-6 py-2 text-2xl font-bold rounded-md cursor-pointer text-white mt-12"
          onClick={() => {
            setDays("");
            setMonth("");
            setYear("");
            setResult({ days: 0, month: 0, year: 0 });
            setObjtError({});
          }}
        >
          Clear fields
        </motion.button>
      </motion.section>
    </div>
  );
}

export default App;



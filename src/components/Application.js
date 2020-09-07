import React, { useState, Fragment, useEffect } from "react";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";



export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });
  
  
  const setDay = function(day) {
    setState({...state, day})
  };



  useEffect( () => {
  
    const requestDays = axios.get('http://localhost:8001/api/days');
    const requestAppointments = axios.get('http://localhost:8001/api/appointments');
    const requestInterviwers = axios.get('http://localhost:8001/api/interviewers')

    axios.all([requestDays,requestAppointments, requestInterviwers])
    .then((response) => {
      console.log('pritnResponse', response);
      console.log('days', response[0].data);
      console.log("interview", response[2].data)
      setState(prev => ({ days: response[0].data, appointments: response[1].data, interviewers: response[2].data}));

    })
    .catch((err)=> {
      console.log(err);
    })
    


  },[]);

  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />  
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {

        getAppointmentsForDay(state, state.day).map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return(
            
              <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview} 
              />
              
      
            
          )
        })}
        <Appointment key="last" time='5pm'/>
      </section>
    </main>
  );
}

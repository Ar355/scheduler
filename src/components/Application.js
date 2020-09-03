import React, { useState, Fragment, useEffect } from "react";
import DayList from "./DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Shefqet Dardha",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }, 
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Taulant Balla",
      interviewer: {
        id: 2,
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }, 
  {
    id: 5,
    time: "1pm",
    interview: {
      student: "Shpat Kasapi",
      interviewer: {
        id: 2,
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];


//days hardcode 
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];




export default function Application(props) {

  const [days, setDay] = useState([]);

  
  useEffect( () => {
  //fetching days
    axios.get('http://localhost:8001/api/days')
    .then((response) => {
      console.log(response.data)
      setDay(response.data)
    })
    .catch((err) => {
      console.log(err);
    })

  },[])

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
            days={days}
            day={days.day}
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
        {appointments.map(appointment => {
          return(
            <Fragment>
              <Appointment
              key={appointment.id} {...appointment} 
              />
              <Appointment key="last" time='5pm'/>
            </Fragment>
            
          )
        })}
      </section>
    </main>
  );
}

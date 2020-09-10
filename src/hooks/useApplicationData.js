import { useState, useEffect } from "react";
import axios from "axios";
import { applyHooks } from "@storybook/addons";

export default function useApplicationData() {

    //state obj
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {}, 
      interviewers: {}
    });

    // set Day Functions
    const setDay = function(day) {
      setState({...state, day})
    };

    // Cancel Interview delete from the server
    const cancelInterview = function(id) {
      //updating the appointments
      const appointment = {
        ...state.appointments[id], interview: null
      };

      const appointments = {
        ...state.appointments,[id]: appointment
      }
       //updating the spots
      const days = [...state.days] 

      days.forEach(day => { 
       if( day.appointments.includes(id)) {
         day.spots += 1
       }

      })
     

      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(resp => {
        return setState({...state, appointments, days })

      });
    }


    // Book interview Function
    const  bookInterview = function(id, interview) {
      //updating the appoitments
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      //updatign the spots
      const days = [...state.days] 

      days.forEach(day => { 
       if( day.appointments.includes(id)) {
         day.spots -= 1
       }
 
      })

      // return axios({
      //   method: "PUT",
      //   url:`http://localhost:8001/api/appointments/${id}`, 
      //   data: {interview}
      // }).then(resp => {
      //   return setState({...state, appointments, days })
      // });
      return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
      .then(resp => {
        return setState({...state, appointments, days })
      });
    }


    useEffect( () => {

      const requestDays = axios.get('http://localhost:8001/api/days');
      const requestAppointments = axios.get('http://localhost:8001/api/appointments');
      const requestInterviwers = axios.get('http://localhost:8001/api/interviewers')
      
      Promise.all([requestDays, requestAppointments, requestInterviwers])
      .then((response) => {

        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}));
      
    })
    .catch((err)=> {
      console.log(err);
    })

  },[]);

  return { state, setDay, bookInterview, cancelInterview }
  
}   
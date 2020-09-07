import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";



export default function Appointment(props) {
  
  // if(props.interview) {
  //   return(
  //   <article className="appointment">
  //   <Header time={props.time} />
  //    <Show 
  //     interviewer={props.interview.interviewer}
  //     student={props.interview.student}
  //    />
  // </article>
  //   );
  // } else {
  //   return(<article className="appointment">
  //   <Header time={props.time} />
  //    <Empty />
  // </article>
  //   )
  // }

   return(
  
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (<Show
       interviewer={props.interview.interviewer}
       student={props.interview.student}/>) : (<Empty />)}
    </article>
  )
}
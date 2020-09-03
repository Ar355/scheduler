import React, { Profiler, Fragment } from "react";
import classnames from 'classnames/bind';
import "components/InterviewerListItem.scss";



export default function InterviewerListItem(props) {
  
  const interviewerClass = classnames("InterviewClass", {
    "interviewers__item" : true,
    "interviewers__item--selected" : props.selected
  })


  return(

    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
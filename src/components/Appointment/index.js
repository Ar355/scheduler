import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status"
import { useState } from "react";
import Confirm from "./Confirm";
import Error from "./Error";


// Transitioning 
const DELETING = "DELETING";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => { 
      transition(SHOW)
    })
    .catch((err) => { transition(ERROR_SAVE, true)});
  }

  function cancelInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch((err) => transition(ERROR_DELETE, true));
  }
  
  return(
  
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
            
          />
          )}
        {mode === CREATE && (
          <Form
            interviewers ={props.interviewers} 
            onCancel={() => transition(EMPTY)}
            onSave={save}
            
          />
          )}

          {mode === EDIT && (
            <Form 
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id} 
            onCancel={() => transition(EMPTY)}
            onSave={save}

            />

          )}

          {mode === SAVING && <Status message={"Saving"}/>}
          {mode === DELETING && <Status message={"Deleting"}/>}
          {mode === CONFIRM && <Confirm message={"Are you sure you whant to delete?"} onConfirm={cancelInterview} onCancel={back}/>}
          {mode === ERROR_SAVE && <Error
            message={"Could not save the appointment"}
            onClose={() => back()}
           />}
          {mode === ERROR_DELETE && <Error 
            message={"Could not cancel the appointment"}  
            onClose={() => transition(SHOW)}
            />}

    </article>
  )
}
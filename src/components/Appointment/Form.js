import React, {useState} from 'react';

import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";




export default function Form(props){
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel =function(){
    reset();
    props.onCancel();
  }
  const reset = function() {
    setName('');
    setInterviewer(null);
  }
  return(

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
        />
        </form>
      <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}
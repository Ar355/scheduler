

export function getAppointmentsForDay(state, day) {

const dayFound = state.days.find(dayObj => dayObj.name === day)

if (!dayFound) {
  return [];
}

const appointments = dayFound.appointments.map(appointId => state.appointments[appointId]);

return appointments;

};

export function getInterview(state, interview) {
  
  if (interview === null) {
    return null;
  }
  
  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId];
 
  let result = { 
    student: interview.student,
    interviewer: interviewerObj
  };

  return result;
 
};


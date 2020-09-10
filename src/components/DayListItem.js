import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames/bind';

const formatSpots =function(spots) {
 
  if (spots === 1) {
  return  `${spots} spot remaining`;
  }
  if (spots > 1) {
   return `${spots} spots remaining`;
  }  
  if (spots === 0) {
    return `no spots remaining`;
  }
}
export default function DayListItem(props) {
  
  

  const dayClass = classnames("dayClass", {
    "day-list__item" : true,
    "day-list__item--selected" : props.selected,
    "day-list__item--full": props.spots === 0 

  })
  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}
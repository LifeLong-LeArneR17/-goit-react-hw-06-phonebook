import React from "react";

export const ContactsList = ({contacts, onChangeDelete}) => {
 return(<ul>
  {contacts.map(({id, name, number }) => (
    <li key={id}>
    <p>Name: {name}</p>
    <p>Number: {number}</p>
    <button id={id.toString()} onClick={onChangeDelete}>Delete</button>
  </li>
  ))}
   </ul>) 
}
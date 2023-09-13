import React from "react";

export const Contacts  = ({contacts}) => {
  return(
    <> 
    {contacts.map(({id, contacts}) => (
    <ul key={id}>
        <li>{contacts}</li>
    </ul>
    ))}
      </>
  );
}
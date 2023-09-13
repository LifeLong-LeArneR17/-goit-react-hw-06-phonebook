import React from "react"

export const Filter = ({onChange, filter}) => {
    return (<>
        <p>Find contacts by name</p>

        <input
          type="text"
          name= "filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onChange}
          value = {filter}
        />
        </>)    
}
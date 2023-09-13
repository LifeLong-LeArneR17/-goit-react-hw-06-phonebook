import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { setContacts, setFilter, setName, setNumber } from "redux/reducer";
import { ContactsList } from "./Contacts/ContactsList/ContactsList";

const LOCAL_KEY = "contacts"

export function  App () {
  const dispatch = useDispatch()
  const contactsFromStore = useSelector(state => state.contactsData.contacts);
  const filterFromStore = useSelector(state => state.contactsData.filter);
  const nameFromStore = useSelector(state => state.contactsData.name);
  const numberFromStore = useSelector(state => state.contactsData.number);

  const handleChange = evt => {
  const {name, value} = evt.target;
  switch (name) {
    case 'name':
      dispatch(setName(value))
      break;
      case 'number':
        dispatch(setNumber(value)) 
        break;
    default:
      break;
  }
}
  
const handleSubmit = (evt) => {
  evt.preventDefault();
  const isDuplicate = contactsFromStore.some((contact) => contact.name === nameFromStore);
  if (isDuplicate) {
    alert(`Contact with name "${nameFromStore}" already exists!`);
    return;
  }
  const newContact = {
    id: nanoid(),
    name: nameFromStore,
    number: numberFromStore,
  };
  dispatch(setContacts([...contactsFromStore, newContact]));
  dispatch(setName(''));
  dispatch(setNumber(''));
};



const handleChangeFilter = evt => {
  dispatch(setFilter(evt.target.value));
 }

 const onChangeDelete = evt => {
    const contactId = evt.target.id;
  // setContacts(prevState => prevState.filter(el => el.id !== contactId))
  dispatch(setContacts(contactsFromStore.filter(el => el.id !== contactId)))
  }


useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contactsFromStore));
},[contactsFromStore]);
 

useEffect(() => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
  if(localData) {
    setContacts(localData)
  }
}, []);

const FilterContacts = contactsFromStore.filter(contact =>
  contact.name.toLowerCase().trim().includes(filterFromStore?.toLowerCase() || '')
);

    return (
      <>
      <form onSubmit={handleSubmit}>
      <h2>Name</h2>
      <input
  type="text"
  name= "name"
  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  value={nameFromStore}
  onChange={handleChange}
/>
<h2>Number</h2>
<input
  type="tel"
  name="number"
  pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  value={numberFromStore}
  onChange={handleChange}
/>
<button type="submit" >Add contact</button>
<h2>Contacts</h2>
    <Filter onChange={handleChangeFilter} filter={filterFromStore}/>
    <ContactsList contacts={FilterContacts} onChangeDelete={onChangeDelete}/>
    </form>
      </>
    );
  }


export default App;



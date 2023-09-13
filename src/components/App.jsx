// import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import { nanoid } from "nanoid";
// import { Filter } from "./Filter/Filter";
// import { ContactsList } from "./Contacts/ContactsList/ContactsList";



// const LOCAL_KEY = "contacts"

// export class App extends Component {
// state = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filter: '',
//   name: '',
//   number: '',
// };

// handleChange = evt => {
//   const {name, value} = evt.target;
//   this.setState({[name] : value});
// }



// handleSubmit = evt => {
//   evt.preventDefault();
//    const {name, number} = this.state;
//     // Проверка наличия контакта с таким именем

//     const isDuplicate = this.state.contacts.some(contact => contact.name === name);
//     if(isDuplicate) {
//     alert(`Contact with name "${name}" already exists!`);
//     return; // Прерываем выполнение функции
//   }
  
//    const NewContact = {
//       // Создаем объект контакта
//     id: nanoid(),
//     name,
//     number
//    };


//    this.setState((Prevstate) => ({
//   contacts: [...Prevstate.contacts, NewContact],
//   name: '',
//   number: '',
// }));
// }


// handleChangeFilter = evt => {
//  this.setState({
//   filter: evt.target.value
//  });

//  }

//  onChangeDelete = evt => {
//   const contactId = evt.target.id;
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(el => el.id !== contactId)
//   }));
// }

// componentDidUpdate(PrevState, Prevprops) {
//   if (PrevState !== this.state.contacts) {
//     localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
//   }
// }


// componentDidMount() {
//   const localData = JSON.parse(localStorage.getItem(LOCAL_KEY))
//   if(localData) {
//     this.setState({contacts: localData});
//   }
// }

//   render() {
//     const FilterContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().trim().includes(this.state.filter?.toLowerCase() || '')
//     );
    
    
//     return (
//       <>
//       <form onSubmit={this.handleSubmit}>
//       <h2>Name</h2>
//       <input
//   type="text"
//   name= "name"
//   pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//   required
//   value={this.state.name}
//   onChange={this.handleChange}
// />
// <h2>Number</h2>
// <input
//   type="tel"
//   name="number"
//   pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//   title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//   required
//   value={this.state.number}
//   onChange={this.handleChange}
// />
// <button type="submit" >Add contact</button>
// <h2>Contacts</h2>
//     <Filter onChange={this.handleChangeFilter} filter={this.state.filter}/>
//     <ContactsList contacts={FilterContacts} onChangeDelete={this.onChangeDelete}/>

//     </form>
//       </>
//     );
//   }
// }

// export default App;



// App.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id:PropTypes.string.isRequired,
//       name:PropTypes.string.isRequired,
//       number:PropTypes.string.isRequired,
//     })
//   ),
//   filter:PropTypes.string,
//   name: PropTypes.string,
//   number: PropTypes.string,
//   handleChange: PropTypes.func,
//   handleSubmit: PropTypes.func,
//   handleChangeFilter: PropTypes.func,
//   onChangeDelete: PropTypes.func,
// }


import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./Contacts/ContactsList/ContactsList";



const LOCAL_KEY = "contacts"

export function  App () {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter , SetFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  

const handleChange = evt => {
  const {name, value} = evt.target;
  switch (name) {
    case 'name':
      setName(value)
      break;
      case 'number':
        setNumber(value)
        break;
    default:
      break;
  }
}
  

const handleSubmit = evt => {
    evt.preventDefault();
    //  const {name, number} = this.state;
      // Проверка наличия контакта с таким именем
  
      const isDuplicate = contacts.some(contact => contact.name === name);
      if(isDuplicate) {
      alert(`Contact with name "${name}" already exists!`);
      return; // Прерываем выполнение функции
    }
     const NewContact = {
        // Создаем объект контакта
      id: nanoid(),
      name,
      number
     };
  
     setContacts(prevState => [...prevState, NewContact]);
     setName('');
     setNumber('')
  }

const handleChangeFilter = evt => {
SetFilter(evt.target.value);
 }

 const onChangeDelete = evt => {
    const contactId = evt.target.id;
  setContacts(prevState => prevState.filter(el => el.id !== contactId))
  }


useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
},[contacts]);
 

useEffect(() => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
  if(localData) {
    setContacts(localData)
  }
}, []);

  const FilterContacts = contacts.filter(contact =>
        contact.name.toLowerCase().trim().includes(filter?.toLowerCase() || '')
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
  value={name}
  onChange={handleChange}
/>
<h2>Number</h2>
<input
  type="tel"
  name="number"
  pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  value={number}
  onChange={handleChange}
/>
<button type="submit" >Add contact</button>
<h2>Contacts</h2>
    <Filter onChange={handleChangeFilter} filter={filter}/>
    <ContactsList contacts={FilterContacts} onChangeDelete={onChangeDelete}/>

    </form>
      </>
    );
  }


export default App;



App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id:PropTypes.string.isRequired,
      name:PropTypes.string.isRequired,
      number:PropTypes.string.isRequired,
    })
  ),
  filter:PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  onChangeDelete: PropTypes.func,
}
import { useEffect, useState } from 'react'

import personsService from "./personService";

import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { FilterForm } from "./components/FilterForm";

const App = () => {
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(persons.find((person) => person.name === name)){
      alert(`${name} is already added to phonebook`);
      return;
    }

    personsService.create({ name: newName, number: newNumber }).then((newPerson) => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");  
    })

  }

  const filteredList = filter.length > 0
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredList} />
    </div>
  )
}

export default App
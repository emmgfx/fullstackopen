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
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if(existingPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personsService.update(existingPerson.id, { name: newName, number: newNumber }).then((updatedPerson) => {
          const newPersonsArray = persons.map((person) => {
            return person.id === updatedPerson.id
              ? updatedPerson
              : person;
          });
          setPersons(newPersonsArray);
          setNewName("");
          setNewNumber("");
        })
      }
      return;
    }

    personsService.create({ name: newName, number: newNumber }).then((newPerson) => {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");  
    })
  }

  const removePerson = (id) => {
    const selectedPerson = persons.find((person) => person.id === id);
    if(!window.confirm(`Delete ${selectedPerson.name}?`)) return;
    personsService.remove(id).then((removedPerson) => {
      setPersons(persons.filter((person) => person.id !== removedPerson.id))
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
      <Persons persons={filteredList} removePerson={removePerson} />
    </div>
  )
}

export default App
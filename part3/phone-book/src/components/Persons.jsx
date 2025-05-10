import { Person } from "./Person"

export const Persons = ({ persons, removePerson }) => {
  return (
    persons.map((person) => (
      <Person
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        removePerson={removePerson}
      />
    ))
  )
}
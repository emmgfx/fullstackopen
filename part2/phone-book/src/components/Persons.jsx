import { Person } from "./Person"

export const Persons = ({ persons }) => {
  return (
    persons.map((person) => (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
      />
    ))
  )
}
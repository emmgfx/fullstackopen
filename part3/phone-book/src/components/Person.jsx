export const Person = ({ id, name, number, removePerson }) => {
  return <p>{name} {number} <button onClick={() => removePerson(id)}>Delete</button></p>;
}
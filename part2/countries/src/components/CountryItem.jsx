export const CountryItem = ({ name, show }) => {
  return (
    <li>{name} <button onClick={() => show(name)}>Show</button></li>
  );
}
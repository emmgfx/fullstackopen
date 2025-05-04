export const CountryDetail = ({ name, capital, area, languages, flag, flagAlt }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(languages).map((iso) => {
          return <li key={iso}>{languages[iso]}</li>
        })}
      </ul>
      <img src={flag} alt={flagAlt} width={320} />
    </>
  );
}
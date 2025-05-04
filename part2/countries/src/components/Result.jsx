import { CountryItem } from "./CountryItem";
import { CountryDetail } from "./CountryDetail";

export const Result = ({ term, countries, show }) => {

  if(countries.length === 0 || term.length === 0){
    return <p>No matches, specifiy another filter</p>;
  }

  if(countries.length > 10){
    return <p>Too many matches ({countries.length}), specifiy another filter</p>;
  }

  if(countries.length === 1){
    const country = countries[0];
    return (
      <CountryDetail
        name={country.name.common}
        capital={country.capital}
        area={country.area}
        languages={country.languages}
        flag={country.flags.svg}
        flagAlt={country.flags.alt}
      />
    )
  }

  return (
    <ul>
      {countries.map((country) => {
        return <CountryItem key={country.cca2} name={country.name.common} show={show} />
      })}
    </ul>
  );
}
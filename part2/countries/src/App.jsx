import { useEffect, useState } from 'react'
import countriesService from './countriesService';
import { Result } from './components/Result';

function App() {
  const [term, setTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((results) => {
      setCountries(results);
    });
  }, []);
  
  return (
    <>
      <p>find countries <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} /></p>
      <Result
        term={term}
        show={(name) => setTerm(name)}
        countries={countries.filter(o => o.name.common.toLocaleLowerCase().includes(term.toLocaleLowerCase()))}
      />
    </>
  )
}

export default App

export const FilterForm = ({ filter, setFilter }) => {
  return (
    <p>Filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} /></p>
  );
}
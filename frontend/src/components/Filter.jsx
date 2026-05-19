function Filter({ setCategory }) {
  return (
    <select
      className="filter"
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Electronics">Electronics</option>
      <option value="Clothing">Clothing</option>
      <option value="Home and Kitchen">Home and Kitchen</option>
    </select>
  );
}

export default Filter;
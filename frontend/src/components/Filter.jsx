function Filter({ setCategory, categories }) {
  return (
    <select
      className="filter"
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All Categories</option>
      {categories.map((c) => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default Filter;
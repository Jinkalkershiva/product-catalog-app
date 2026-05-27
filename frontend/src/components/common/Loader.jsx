function Loader() {
  return (
    <div className="loader-container">
      <div className="pulse-loader">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <p className="loader-text">Fetching inventory...</p>
    </div>
  );
}

export default Loader;

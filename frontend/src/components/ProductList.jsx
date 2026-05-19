import "./ProductList.css";

function ProductList({ products }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <div className="card" key={product.id}>

          <img src={product.imageUrl} alt={product.name} />

          <h3>{product.name}</h3>
          <p>{product.description}</p>

          <div className="price">₹{product.price}</div>

          <div className="category">
            {product.category.name}
          </div>

        </div>
      ))}
    </div>
  );
}

export default ProductList;
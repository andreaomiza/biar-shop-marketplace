import ProductCard from './ProductCard';

const ProductList = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-white">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;


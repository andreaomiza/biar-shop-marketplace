import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const simulatePurchase = () => {
    if (cart.length === 0) return;
    alert('Compra simulada con éxito 🎉');
    setCart([]);
    setIsCartOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Marketplace</h1>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          {isCartOpen ? 'Cerrar Carrito' : `Carrito (${totalItems})`}
        </button>
      </div>

      {loading && <p className="text-center text-gray-700">Cargando productos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {!loading && !error && products.length === 0 && (
          <p className="text-center col-span-full text-gray-700">No hay productos disponibles.</p>
        )}
        {products.map((product) => (
          <ProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onRemove={removeItem}
        onPurchase={simulatePurchase}
      />
    </div>
  );
};

export default Marketplace;



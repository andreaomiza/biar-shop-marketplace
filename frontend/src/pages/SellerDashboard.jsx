import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createProduct } from '../services/api.js';
import { showSuccess, showError } from '../utils/alerts';

const categories = ['Audiolibros', 'Fuentes', 'Plantillas Webs', 'Samplers', 'ViRemix'];

const SellerDashboard = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: categories[0],  // valor por defecto
    fileUrl: '',
    imageUrl: '',
    isPublic: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...product,
        price: parseFloat(product.price),
        seller: user._id,
      });
      showSuccess('Producto creado correctamente');
      setProduct({
        title: '',
        description: '',
        price: '',
        category: categories[0],
        fileUrl: '',
        imageUrl: '',
        isPublic: true,
      });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showError('Error al crear el producto');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="Descripción"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="w-full p-2 border"
          required
          step="0.01"
        />
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="w-full p-2 border"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="url"
          placeholder="URL del archivo"
          value={product.fileUrl}
          onChange={(e) => setProduct({ ...product, fileUrl: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="url"
          placeholder="URL de la imagen"
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={product.isPublic}
            onChange={(e) => setProduct({ ...product, isPublic: e.target.checked })}
          />
          <span>¿Producto público?</span>
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;



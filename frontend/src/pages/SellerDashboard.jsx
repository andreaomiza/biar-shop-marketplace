import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { api, baseURL } from '../services/api';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    file: null,
    image: null,
    isPublic: true,
  });

  useEffect(() => {
    if (!user) return;

    if (user.role !== 'vendedor') {
      toast.error('Acceso denegado');
      navigate('/');
      return;
    }

    const fetchSellerProducts = async () => {
      try {
        const res = await api.get('/products');
        const sellerProducts = res.data.filter(p => p.seller._id === user._id);
        setProducts(sellerProducts);
      } catch (err) {
        console.error(err);
        toast.error('Error al cargar productos');
      }
    };

    fetchSellerProducts();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('file', formData.file);
      data.append('image', formData.image);
      data.append('isPublic', formData.isPublic);

      const res = await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Producto creado con éxito');
      setProducts([...products, res.data]);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        file: null,
        image: null,
        isPublic: true,
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error('Error al crear producto');
    }
  };

  if (!user || user.role !== 'vendedor') return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel del Vendedor</h1>
        <button
          className="flex items-center gap-2 bg-[#E3FF6A] hover:bg-[#d6f154] text-black font-semibold px-4 py-2 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <Upload size={18} />
          {showForm ? 'Cancelar' : 'Nuevo Producto'}
        </button>
      </div>

      {showForm && (
        <form
          className="bg-white shadow-md rounded p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleInputChange} className="border p-2 rounded" required />
          <input type="number" name="price" placeholder="Precio USD" value={formData.price} onChange={handleInputChange} className="border p-2 rounded" required />
          <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} className="border p-2 rounded md:col-span-2" />

          <select name="category" value={formData.category} onChange={handleInputChange} className="border p-2 rounded" required>
            <option value="">Seleccionar categoría</option>
            <option value="audiolibros">Audiolibros</option>
            <option value="fuentes">Fuentes</option>
            <option value="plantillas-web">Plantillas Web</option>
            <option value="samplers">Samplers</option>
            <option value="viremix">ViRemix</option>
            <option value="otros">Otros</option>
          </select>

          <div>
            <label className="block text-sm font-medium mb-1">Archivo Principal (.mp3, .pdf, etc)</label>
            <input type="file" name="file" onChange={handleInputChange} className="border p-2 rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Imagen del producto</label>
            <input type="file" name="image" onChange={handleInputChange} className="border p-2 rounded" required />
          </div>

          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleInputChange} />
            ¿Producto público?
          </label>

          <button type="submit" className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 md:col-span-2">
            Crear Producto
          </button>
        </form>
      )}

      {products.length === 0 ? (
        <p>No tienes productos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded shadow p-4">
              <img
                src={product.imageUrl?.startsWith('http') ? product.imageUrl : `${baseURL}/uploads/${product.imageUrl}`}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-black font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;




// El código de arriba es un componente de React que representa el panel de control del vendedor.
// Este componente se encarga de mostrar los productos que el vendedor ha creado.
//
// Primero, se verifica si el usuario está autenticado y si su rol es "vendedor".
// Si no es así, se redirige al usuario a la página principal y se muestra un mensaje de error.
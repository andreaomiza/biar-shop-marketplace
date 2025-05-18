import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  const {
    imageUrl,
    title,
    category,
    description,
    price,
    fileUrl,
    isPublic,
  } = product;

  const defaultImage = 'https://biarshop.store/wp-content/uploads/2025/05/Captura_de_Pantalla_2025-05-05_a_la_s__04.17.31-removebg-preview.png';

  return (
    <div className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={imageUrl || defaultImage}
        alt={title}
        loading="lazy"
        className="max-w-full h-40 object-cover mb-4 rounded mx-auto"
      />

      <h2 className="text-lg font-bold truncate">{title}</h2>
      <p className="text-sm text-gray-600 truncate capitalize">{category || 'Sin categoría'}</p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-3">{description || 'Sin descripción'}</p>
      <p className="text-sm text-gray-500 mt-2">
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <strong>Archivo:</strong>{' '}
        <a href={fileUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          Descargar
        </a>
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <strong>Visible:</strong> {isPublic ? 'Sí' : 'No'}
      </p>
      <p className="text-base font-semibold text-gray-900 mt-2">${(price || 0).toFixed(2)}</p>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
          aria-label={`Añadir ${title} al carrito`}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;




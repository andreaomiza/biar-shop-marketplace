import React from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

const CartDrawer = ({ isOpen, cart = [], onClose, onIncrement, onDecrement, onRemove, onPurchase }) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out w-80`}
      role="dialog"
      aria-label="Carrito de compras"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Carrito</h2>
          <button
            onClick={onClose}
            className="text-red-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            aria-label="Cerrar carrito"
          >
            Cerrar
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4 overflow-auto flex-grow">
              {cart.map((item) => (
                <li key={item._id} className="flex items-center space-x-4">
                  <img
                  src={item.imageUrl || 'https://via.placeholder.com/100x100?text=Sin+imagen'}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded"
                  loading="lazy"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        onClick={() => onDecrement(item._id)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onIncrement(item._id)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Eliminar producto"
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4 mt-4">
              <p className="text-right text-lg font-semibold text-gray-800">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button
                onClick={onPurchase}
                className="mt-3 w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow"
              >
                <ShoppingCart size={18} className="mr-2" />
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

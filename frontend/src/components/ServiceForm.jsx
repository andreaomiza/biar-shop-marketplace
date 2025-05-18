import React, { useState } from 'react';
import { showSuccess, showError } from '../utils/alerts';

const ServiceForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    serviceType: '',
    message: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('serviceType', form.serviceType);
      formData.append('message', form.message);
      if (form.file) {
        formData.append('file', form.file);
      }

      const res = await fetch('/api/services/request', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error enviando la solicitud');
      }

      showSuccess('Solicitud enviada correctamente.');

      setForm({
        name: '',
        email: '',
        serviceType: '',
        message: '',
        file: null,
      });
    } catch (err) {
      showError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <input
        name="name"
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <select
        name="serviceType"
        value={form.serviceType}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Tipo de servicio</option>
        <option value="logo">Diseño de Logo</option>
        <option value="video">Edición de Video</option>
        <option value="voiceover">Grabación Voice Over</option>
        <option value="beat">Producción de Beat</option>
      </select>
      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="file"
        type="file"
        onChange={handleChange}
        className="w-full"
        accept=".jpg,.jpeg,.png,.pdf,.mp3,.mp4"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#ff0044] text-white px-6 py-2 rounded hover:bg-[#e00068] disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  );
};

export default ServiceForm;


exports.createOrder = async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id;

  try {
    // Aquí podrías guardar la orden en la BD, ejemplo:
    // const newOrder = new Order({ user: userId, items, total });
    // await newOrder.save();

    res.status(201).json({
      message: 'Orden creada',
      order: { userId, items, total }
    });
  } catch (error) {
    console.error('Error creando orden:', error);
    res.status(500).json({ message: 'Error al crear la orden' });
  }
};
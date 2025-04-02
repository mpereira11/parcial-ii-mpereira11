const express = require('express');
const app = express();
const PORT = 3000;

// Usamos JSON como middleware
app.use(express.json());

// Arreglo de memoria con 3 productos (id, nombre, precio)
const products = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 }
];

// GET /products - Devuelve la lista de productos
app.get('/products', (req, res) => {
    res.json(products);
});

// GET /products/:id - Devuelve un producto por ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Producto con ese ID, no encontrado' });
    }
    res.json(product);
});

// POST /products - Agrega un nuevo producto
app.post('/products', (req, res) => {
    const { id, nombre, precio } = req.body;

    // Validar si el ID ya existe
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: 'Ya existe un producto con esa ID' });
    }

    // Validar datos del producto
    if (!id || !nombre || !precio) {
        return res.status(400).json({ error: 'Datos del producto incompletos (Id, nombre, precio)' });
    }

    // Agregar el nuevo producto
    const nuevoProducto = { id, nombre, precio };
    products.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
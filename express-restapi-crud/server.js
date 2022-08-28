const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
//const connectDB = require('./db');

//connectDB()

const app = express();

let productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 100
    }
];

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Métodos principales

app.get('/productos', (req, res) => {
    console.log(productos);
    res.json(productos);
});

app.post('/productos', (req, res) =>{
    const newProduct = {...req.body, id: productos.length + 1};

    productos.push(newProduct);
    res.send(newProduct);

});

app.put('/productos', (req, res) => {
    const newData = req.body;
    const productFound = productos.find(p => {return p.id === parseInt(req.params.id)});

    if (!productFound) {
        return res.status(404).send('Producto no encontrado');
    };

    productos = productos.map(p => {p.id === parseInt(req.params.id) ? {...p, ...newData} : p});

    res.json({
        "message": "Producto actualizado"
    });
});

app.delete('/productos/:id', (req, res) => {
    const deleteProduct = productos.find(producto => {return producto.id === parseInt(req.params.id)});

    if(!deleteProduct) {
        return res.status(404).send('Producto no encontrado');
    }
    productos = productos.filter(producto => {return producto.id !== parseInt(req.params.id)});
    res.sendStatus(204);
});

app.get('/productos/:id', (req, res) => {
    const productFound = productos.find(product => {return product.id === parseInt(req.params.id)});
    
    if(!productFound){
        return res.status(404).json({"message":'Producto no encontrado'});
    }
    res.json(productFound);
});

//Obtengo datos externos con axios
app.get('/datos', async (req,res) =>{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    res.json(response.data);
})

//conexión a la base de datos




app.listen(3000);
console.log('Server is running on port 3000');
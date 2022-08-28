const express = require('express');

const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use((req,res,next) => {
    console.log('Página URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
})



app.get('/', (req, res) => {

    res.send('Hello Argentina');


    /* res.sendFile('./static/index.html',
    {root: __dirname}); */
});

app.get('/user/:username', (req, res) =>{
    console.log(typeof req.params.username);
    res.send(`Hola ${req.params.username}`);
});

app.get('/sumar/:x/:y', ({params: {x,y}}, res) =>{

    res.send(`La suma es ${parseInt(x)+parseInt(y)}`);
});

app.get('/product', (req, res) => {
    res.send('lista de productos');
});

app.get('/about', (req, res) => {
    res.send('Page about');
});

app.put('/product', (req, res) => {
    res.send('creando productos');
});

app.get('/miarchivo', (req, res) => {
    res.sendFile('./logo.jpeg', {
        root: __dirname
    })
});

app.get('/user/:nombre/logo', (req, res) =>{
    if (req.params.nombre === 'martin') {
        return res.sendFile('./logo.jpeg',{
            root: __dirname
        })
    }
    res.send('No tienes permiso para ver este logo');
});

app.get('/user', (req, res) => {
    res.json({
        "name": "martin",
        "lastname": "piccato",
        materias: ['Administración', 'Econometría', 'Macroeconomía']
    });
});


app.post('/createuser', (req, res) => {
    request = req.body;
    console.log(request)

    res.send('Creando usuario')
});

// trabajo on querys

app.get('/buscar', (req, res) => {
    if (req.query.q === 'martin') {
        return res.send('martin');
    } else {
        return res.send('no encontrado');
    }
});






// Si visita una URl que no existe...

app.use((req, res) => {
    res.status(404).send('404 Page not found, No se encontró la página');
});



app.listen(3000)
console.log('server is running on port 3000');


// servidor con http

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req,res) => {
//     const read = fs.createReadStream('./static/index.html')

//     read.pipe(res)
// });

// server.listen(3000);
// console.log('Server is running on port 3000');
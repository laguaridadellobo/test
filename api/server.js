const { response } = require('express');
const express = require('express');
const app = express();
var sharp = require('sharp');
const multer = require('multer');
var fs = require('fs');
var bodyparser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
//PERMITE PODER RECIBIR FORMATO JSON
app.use(express.json());
app.set("json spaces", 2);
const date = Date.now()
const name = new String(date + "h");

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb) {
        cb(null, name + "." + "jpeg");
    }
})
const upload = multer({
    storage: storage
});

var uploads = multer({ dest: './images' })





app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.post("/file", upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("no ahi archivo!");
        const exito = { "Mensaje": "Sin archivo" }
        res.json(exito);
    } else {
        setTimeout(() => {
            sharp('uploads/' + name + '.jpeg')
                .resize(1200, 628)
                .jpeg({ mozjpeg: true })
                .toFile('Facebook/Noticias/' + 'noti' + name + '.jpeg', (err, info) => {
                    if (err) console.error(err);
                    console.log(info);
                });
            sharp('uploads/' + name + '.jpeg')
                .resize(1080, 1920)
                .jpeg({ mozjpeg: true })
                .toFile('Facebook/Stories/' + 'stori' + name + '.jpeg', (err, info) => {
                    if (err) console.error(err);
                    console.log(info);
                });
            sharp('uploads/' + name + '.jpeg')
                .resize(1080, 1080)
                .jpeg({ mozjpeg: true })
                .toFile('Facebook/Carrusel/' + 'carru' + name + '.jpeg', (err, info) => {
                    if (err) console.error(err);
                    console.log(info);
                });
        }, 1500);


        console.log('si ahi archivo!');
        const exito = { "Mensaje": "Imagen Subida" }
        res.json(exito);
    }

});

/////////////OTRA API
app.use(bodyparser.urlencoded({ extended: true }))
app.post('/upload', uploads.single("avatar"), (req, res) => {
    fs.rename(req.file.path, '/images/avatar.jpg', (err) => {
        console.log("primer error de upload");
        console.log(err);
    })

    sharp(__dirname + '/images/avatar.jpg').resize(200, 200)
        .jpeg({ quality: 50 }).toFile(__dirname +
            '/images/avatar_thumb.jpg');


    sharp(__dirname + '/images/avatar.jpg').resize(640, 480)
        .jpeg({ quality: 80 }).toFile(__dirname +
            '/images/avatar_preview.jpg');

    const exito = { "exito": "en upload" }
    res.json("File Uploaded Successfully!");
});
//------------------------RUTAS
app.get('/', (req, res) => {
    res.send({ "Mensaje": "API de NodeJS realizada por Alberto" });
});

//comenzando el servidor
app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
})
// Crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

db = connect( 'mongodb://localhost/ecommerce' );

db.createCollection("productos");
db.createCollection("mensajes");

// Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. 
// El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable 
// con base de datos MariaDB. 

// Definir las claves de los documentos en relación a los campos de las tablas de esa base. 
// En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos
// (eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

db.mensajes.insertMany([
    {usermail:"mauricio@rodriguez.com.ar", fecha:ISODate(), mensaje:"Hola"},
    {usermail:"violeta@velazquez.com.ar",  fecha:ISODate(), mensaje:"Como estas?"},
    {usermail:"mauricio@rodriguez.com.ar", fecha:ISODate(), mensaje:"Hola"},
    {usermail:"violeta@velazquez.com.ar",  fecha:ISODate(), mensaje:"Bien y vos?"},
    {usermail:"mauricio@rodriguez.com.ar", fecha:ISODate(), mensaje:"Bien, y tu familia?"},
    {usermail:"violeta@velazquez.com.ar",  fecha:ISODate(), mensaje:"Todo tranquilo por suerte, la tuya?"},
    {usermail:"mauricio@rodriguez.com.ar", fecha:ISODate(), mensaje:"Todo en orden"},
    {usermail:"violeta@velazquez.com.ar",  fecha:ISODate(), mensaje:"Bueno, manda saludos"},
    {usermail:"mauricio@rodriguez.com.ar", fecha:ISODate(), mensaje:"Chau!"},
    {usermail:"violeta@velazquez.com.ar",  fecha:ISODate(), mensaje:"Nos vemos"},
])

db.productos.insertMany([
    {nombre:"Granos de cafe", precio:120, foto: "https://pics.freeicons.io/uploads/icons/png/21216626961657475817-512.png"},
    {nombre:"Tasa", precio:580, foto: "https://pics.freeicons.io/uploads/icons/png/19274897351657475818-512.png"},
    {nombre:"Molinillo", precio:900, foto: "https://pics.freeicons.io/uploads/icons/png/48675441657475818-512.png"},
    {nombre:"Vaso", precio:1280, foto: "https://pics.freeicons.io/uploads/icons/png/11647863221657475818-512.png"},
    {nombre:"Colador", precio:1700, foto: "https://pics.freeicons.io/uploads/icons/png/8266623721657475819-512.png"},
    {nombre:"Bolsa de cafe", precio:2300, foto: "https://pics.freeicons.io/uploads/icons/png/21225258571657475817-512.png"},
    {nombre:"Jarra", precio:2860, foto: "https://pics.freeicons.io/uploads/icons/png/4218157891657475819-512.png"},
    {nombre:"Copa", precio:3350, foto: "https://pics.freeicons.io/uploads/icons/png/6680848941657475819-512.png"},
    {nombre:"Portafiltro", precio:4320, foto: "https://pics.freeicons.io/uploads/icons/png/9177163441657475820-512.png"},
    {nombre:"Cafetera", precio:4990, foto: "https://pics.freeicons.io/uploads/icons/png/20926380481657475819-512.png"},
])

// Listar todos los documentos en cada colección.
print("La colección de mensajes es:\n")
printjson(db.mensajes.find());

print("La colección productos es:\n")
printjson(db.productos.find());

// Mostrar la cantidad de documentos almacenados en cada una de ellas.
print(`Cantidad total de productos: ${db.productos.estimatedDocumentCount()}`);
print(`Cantidad total de mensajes: ${db.mensajes.estimatedDocumentCount()}`);

// Agregar un producto más en la colección de productos 
db.productos.insertOne({nombre:"Cappuccino", precio:4120, foto:"https://pics.freeicons.io/uploads/icons/png/8936010551657475818-512.png"});

// Realizar una consulta por nombre de producto específico:
db.products.findOne({nombre: "Molinillo"});

// Listar los productos con precio menor a 1000 pesos.
db.productos.find({"precio":{$lt:1000}},{"nombre":1});

// Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({"precio":{$gte:1000,$lte:3000}},{"nombre":1});

// Listar los productos con precio mayor a 3000 pesos.
db.productos.find({"precio":{$gt:3000}},{"nombre":1});

// Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find().skip(2).limit(1).sort({"precio": 1})

// Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({},{$set:{"stock":100}});

// Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
db.productos.updateMany({"precio":{$gt:4000}},{$set:{"stock":0}});

// Borrar los productos con precio menor a 1000 pesos 
db.productos.deleteMany({"precio":{$lt:1000}});

// Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
db = connect( 'mongodb://localhost/admin' );

db.createUser(
    {
        user: "pepe",
        pwd:"asd456",
        roles:[
            {role:"read",db:"ecommerce"}
        ]
    }
);

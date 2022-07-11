# Challenge-CRUD_Node.js_Mongodb

## Funcionamiento del programa
    1- model/class/Model.js: Se encontrara una clase, se puede
     decir que sera la  clase padre que va ser la que posee los metodos requeridos para poder hacer las tareas.
    2- model/database/Mongo.js archivo para poder hacer la
    conexion a la base de datos de mongodb.
    4- node_modules carpeta que contiene todos los archivos
    que son requeridos para el funcionamiento del programa.
    5- src/models lugar donde se todos los modelos pensados
    para el programa por ejemplo Usuario y Empresa.
    6- src/routes/index.js conexion de las rutas para su uso
    8- src/routes/carrito o producto lugar donde se encuentran los metodos
    9- src/structures carpeta donde se encuentra funciones que
    sirve para que a la hora de ser llamado un metodo se tenga
    en cuenta algunas cosas como por ejemplo que un name no puede
    ser un boolean sino un string y si es requerido o no.
    10- test carpeta donde estan todos los test para probar los
    distintos escenarios del programa y ver que sucede a la hora
    de que se manda un req.body mal echo entre otras cosas.
    11- package.json archivo donde se encontrara los script,
    dependencias, repositorio, datos del author y devDependencias del prorgrama
    12- server.js se puede decir que seria el main del programa
    donde se hace las conexiones entre otras cosas.
    13- archivos eslint sirven para la hora de acomodar las cosas y
    que se siga una estructura de diseño.

## Ejecución del programa

    1- Crear un archivo con el nombre .env y agregar la siguiente estructura:
        a_ PORT (se uso el puerto 7020 para este proyecto asi que puede ser usado tambien).
        b_ URL_DB (dirreción de la base de datos) seria para la base de datos.
        c_ NAME_DATABASE (nombre de la base de datos con la que se decee trabajar)

    2- Abrir la terminal y asegurarse que esta en la ruta del achivo donde si escribe 'ls'
    en la terminal y le da enter deberia de encontrar los archivos(server.js entre otros).

    3- Leer el package.json donde se van a poder encontrar algunos scripts:
        a_ npm run demon = levata el programa para su ejecucion.
        b_ npm run test = se correran los test que serian posibles ecenarios.
        b_ npm run test-watch = se correran los test que serian posibles ecenarios pero quedara la terminal levantada
        (sirve para la hora de hacer los test del programa no estar corriendo el 'npm run test'
        cada vez que se implementa un test nuevo o se corrigue un test). Entre otros mas.

    4- Escribir npm i para poder instalar todas las dependencias y devDependecias.

    5- Ejecutar el programa con el comando npm run demon donde aprecera `
    [nodemon] 2.0.18
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server.js`
    listening to port: 7020`
    que implicaria que el programa se esta ejecutando, se lo
    puede probar con aplicaciones como postman que fue el que
    se estuvo utilizando para comprobar el
    funcionamiento del mismo
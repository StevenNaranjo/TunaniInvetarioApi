import app from './app.js'
//Comprobrar conexion con getConnection
import {getConnection} from './database/connection.js'
getConnection()


app.listen(1434)
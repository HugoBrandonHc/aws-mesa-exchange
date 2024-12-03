const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const express = require('express');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "GamesSubidos";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false;
const partitionKeyName = "gameID";  // Clave primaria
const partitionKeyType = "S";  // Tipo de clave primaria (string)
const path = "/games";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;

// Declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Convert URL string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

// HTTP POST method for inserting objects (subir juego)
app.post(path, async function(req, res) {
  // Agregar un gameID único si no lo envían
  if (!req.body.gameID) {
    req.body.gameID = Math.random().toString(36).substr(2, 9);  // Genera un ID único
  }

  // Asegurarse de que el objeto contiene los datos necesarios
  const gameData = {
    gameID: req.body.gameID,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    createdAt: req.body.createdAt || new Date().toISOString(),
    condition: req.body.condition,
    quality: req.body.quality || 'N/A',  // Si no se ha proporcionado calidad, colocar 'N/A'
    category: req.body.category,
    tradeType: req.body.tradeType
  };

  // Logs detallados
  console.log("Datos recibidos en POST /games:", req.body);
  console.log("Datos preparados para DynamoDB:", gameData);


  // Validaciones
  if (!gameData.title || !gameData.description || isNaN(parseFloat(gameData.price))) {
    res.status(400).json({ error: 'Datos obligatorios faltantes o inválidos (title, description, price).' });
    return;
  }

  // Configuración para insertar el juego en DynamoDB
  const putItemParams = {
    TableName: tableName,
    Item: gameData
  };

  // Log de parámetros enviados a DynamoDB
  console.log("Parámetros enviados a DynamoDB:", putItemParams);


  try {
    // Insertar el juego en la base de datos
    const data = await ddbDocClient.send(new PutCommand(putItemParams));
    console.log("Resultado de DynamoDB:", data);
    res.json({ success: 'Juego subido correctamente', gameID: gameData.gameID });
  } catch (err) {
    console.error("Error al insertar en DynamoDB:", err);
    res.status(500).json({ error: 'Error al insertar el juego', details: err.message, stack: err.stack });
  }
});

// HTTP GET method to list objects (obtener juegos)
app.get(path, async function(req, res) {
  const params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES'
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});

// HTTP GET method to get single object by gameID
app.get(path + hashKeyPath, async function(req, res) {
  const params = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: req.params[partitionKeyName]
    }
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.status(404).json({ error: 'Juego no encontrado' });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load item: ' + err.message});
  }
});

// HTTP DELETE method for deleting an object (eliminar juego)
app.delete(path + hashKeyPath, async function(req, res) {
  const params = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: req.params[partitionKeyName]
    }
  };

  try {
    const data = await ddbDocClient.send(new DeleteCommand(params));
    res.json({ success: 'Juego eliminado correctamente', data });
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not delete item: ' + err.message});
  }
});

app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;

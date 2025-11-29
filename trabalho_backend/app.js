require('dotenv').config(); 
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Conectar ao Banco
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/tarefas', require('./src/routes/tarefaRoutes'));

app.post('/auth/login', (req, res) => {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ user: { id: '123' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = app;
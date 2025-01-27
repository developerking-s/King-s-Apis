const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Teste do Endpoint
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// Endpoint para obter comandos do bot
app.get('/commands', (req, res) => {
    const commands = [
        { name: 'ping', description: 'Responde com Pong!' },
        { name: 'help', description: 'Mostra os comandos disponíveis.' },
        { name: 'ban', description: 'Bane um usuário do servidor.' }
    ];
    res.json(commands);
});

// Endpoint para receber dados do bot
app.post('/log', (req, res) => {
    const { event, message } = req.body;
    console.log(`Evento recebido: ${event} - Mensagem: ${message}`);
    res.status(201).send('Log recebido com sucesso!');
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
                  
  

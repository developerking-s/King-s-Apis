const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rota principal de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Canvas!');
});

// Endpoint para criar uma imagem personalizada
app.get('/generate-image', async (req, res) => {
  const { text = 'Olá Mundo!', color = '#5865F2' } = req.query;

  // Dimensões do Canvas
  const width = 800;
  const height = 400;

  // Criar o Canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fundo
  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, 0, width, height);

  // Adicionar Texto
  ctx.font = 'bold 50px Arial';
  ctx.fillStyle = color; // Cor personalizada
  ctx.textAlign = 'center';
  ctx.fillText(text, width / 2, height / 2);

  // Adicionar uma borda
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, width, height);

  // Converter para imagem
  const buffer = canvas.toBuffer('image/png');

  // Enviar imagem gerada
  res.set('Content-Type', 'image/png');
  res.send(buffer);
});

// Rota para carregar uma imagem customizada e adicionar texto
app.get('/custom-image', async (req, res) => {
  const { imageUrl, text = 'Zump Bot', textColor = '#FFFFFF' } = req.query;

  if (!imageUrl) {
    return res.status(400).send('Por favor, forneça a URL da imagem em imageUrl.');
  }

  try {
    const image = await loadImage(imageUrl);

    // Criar Canvas com base no tamanho da imagem carregada
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Desenhar imagem no Canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Adicionar texto sobre a imagem
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = textColor; // Cor do texto
    ctx.textAlign = 'center';
    ctx.fillText(text, image.width / 2, image.height / 1.1);

    // Converter para imagem
    const buffer = canvas.toBuffer('image/png');

    // Enviar imagem gerada
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar a imagem.');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
                                

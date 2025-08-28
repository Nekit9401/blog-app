require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const port = 3001;
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Сервер запущен на порту ${port}`);
	});
});

const express = require('express');

const { PORT } = require('./config/serverConfig');
const dbconnect = require('./config/database');
const apiRoutes = require('./routes/index');

const startAndStopServer = async () => {
    const app = express();

    //Adding middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Routes
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started at PORT:${PORT}`);
        await dbconnect();
    });
}

startAndStopServer();
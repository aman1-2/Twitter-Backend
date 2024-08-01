import express from 'express';

import {PORT} from './config/serverConfig.js';
import { dbconnect } from './config/database.js';
import apiRoutes from './routes/index.js';

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
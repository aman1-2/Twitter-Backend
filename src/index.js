const express = require('express');

const { PORT } = require('./config/serverConfig');
const dbconnect = require('./config/database');
const { TweetService } = require('./services/index');

const startAndStopServer = async () => {
    const app = express();

    //Adding middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, async () => {
        console.log(`Server Started at PORT:${PORT}`);
        await dbconnect();

        // const data = {
        //     content: "This is my #second #Tweet, really #excited."
        // };
        // const service = new TweetService();
        // const response = await service.create(data);
        // console.log(response);
    });
}

startAndStopServer();
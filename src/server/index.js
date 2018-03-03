//@flow
import Express from 'express';
import { Server as HttpServer } from 'http';
import SocketIO from 'socket.io';
import { staticFolder, httpPort } from 'config';

class Server
{
  constructor() {
    // Create Express app
    const express = new Express();

    // Set static folder
    express.use(Express.static(staticFolder));

    // Create http server with Express instance
    const server = HttpServer(express);

    // Start server & listen on port
    server.listen(httpPort);

    // Initialize Socket.io with http server instance
    const io = SocketIO(server);
  }
}

export default Server;

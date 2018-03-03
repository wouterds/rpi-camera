//@flow
import Express from 'express';
import { Server as HttpServer } from 'http';
import SocketIO from 'socket.io';
import { staticFolder, httpPort } from 'config';
import LogService from 'server/services/Log';
import EventService from 'server/services/Event';
import Registry from 'server/registry';

class Server
{
  constructor() {
    this.logService = Registry.get(LogService);

    this.logService.log('[Server] Initializing..');

    this.setupServer();
  }

  setupServer() {
    this.logService.log('[Server] Initializing Express..');
    const express = new Express();

    this.logService.log('[Server] Configuring Express static folder..');
    express.use(Express.static(staticFolder));

    this.logService.log('[Server] Initializing http server with Express instance..');
    const server = HttpServer(express);

    this.logService.log(`[Server] Start http server on port ${httpPort}..`);
    server.listen(httpPort);

    this.logService.log(`[Server] Initializing Socket.io with http server instance..`);
    const io = SocketIO(server);

    // Cache event service in registry
    Registry.set(EventService, new EventService(io));

    // Set event service on LogService so it can broadcast
    this.logService.eventService = Registry.get(EventService);
  }
}

export default Server;

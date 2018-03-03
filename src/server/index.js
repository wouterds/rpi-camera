import Express from 'express';
import { Server as HttpServer } from 'http';
import SocketIO from 'socket.io';
import { staticFolder, httpPort } from 'config';
import LogService from 'server/services/Log';
import EventService from 'server/services/Event';
import ServoService from 'server/services/Servo';
import Registry from 'server/Registry';

class Server
{
  /**
   * Constructor
   */
  constructor() {
    this.logService = Registry.get(LogService);
    this.servoService = Registry.get(ServoService);

    this.logService.log('info', '[Server] Initializing..');

    this.setup();

    this.logService.log('ok', '[Server] Ready for connections!');
  }

  /**
   * Setup
   */
  setup() {
    this.logService.log('info', '[Server] Initializing Express..');
    const express = new Express();

    this.logService.log('info', '[Server] Configuring Express static folder..');
    express.use(Express.static(staticFolder));

    this.logService.log('info', '[Server] Configuring Express routes..');
    express.get('/servo/left', ::this.moveServoLeft);
    express.get('/servo/right', ::this.moveServoRight);

    this.logService.log('info', '[Server] Initializing http server with Express instance..');
    const server = HttpServer(express);

    this.logService.log('info', `[Server] Start http server on port ${httpPort}..`);
    server.listen(httpPort);

    this.logService.log('info', `[Server] Initializing Socket.io with http server instance..`);
    const io = SocketIO(server);

    // Cache event service in registry
    Registry.set(EventService, new EventService(io));

    // Set event service on LogService so it can broadcast
    this.logService.eventService = Registry.get(EventService);
  }

  /**
   * Move servo left
   *
   * @param {object} request
   * @param {object} response
   */
  moveServoLeft(request, response) {
    // Move servo left
    this.servoService.moveLeft();

    // Response
    response.json({ success: true });
  }

  /**
   * Move servo right
   *
   * @param {object} request
   * @param {object} response
   */
  moveServoRight(request, response) {
    // Move servo left
    this.servoService.moveRight();

    // Response
    response.json({ success: true });
  }
}

export default Server;

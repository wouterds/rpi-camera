import LogService from 'server/services/Log';
import Registry from 'server/registry';

class EventService {
  /**
   * Constructor
   *
   * @param {IO} io
   */
  constructor(io) {
    this.logService = Registry.get(LogService);
    this.logService.log('[Services.Event] Initializing..');

    this.io = io;
    this.events = [];

    this.io.on('connection', ::this.connection);
  }

  /**
   * When a new connection is opened
   *
   * @param {object} socket
   */
  connection(socket) {
    // Push history
    this.events.forEach((event) => {
      socket.emit(event.type, event.data);
    });

    // Log after pushing history to keep it in sync
    this.logService.log(`[Services.Event] New client connected: ${socket.id}!`);

    socket.emit('client-id', socket.id);
  }

  /**
   * Push new event
   *
   * @param {string} type
   * @param {string} data
   */
  push(type, data) {
    // Add to internal stack
    this.events.push({ type, data });

    // Emit to all connected clients
    this.io.emit(type, data);
  }
}

module.exports = EventService;

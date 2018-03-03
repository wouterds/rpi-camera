const singleton = Symbol();
const singletonEnforcer = Symbol();

// Special case that is it's own singleton and is not instantiated by registry
// We need this to log everything, even before the registry is instantiated
class LogService {
  /**
   * Constructor
   *
   * @param {Symbol} enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this._type = 'SingletonEnforcer';

    this.notBroadcastedYet = [];

    this.log('[Services.Log] Initializing');
  }

  /**
   * Get singleton instance
   *
   * @return {LogService}
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new LogService(singletonEnforcer);
    }

    return this[singleton];
  }

  /**
   * Set event service to broadcast events over socket connection
   *
   * @param {EventService} eventService
   */
  set eventService(eventService) {
    if (this.es) {
      return;
    }

    this.es = eventService;

    if (this.notBroadcastedYet.length === 0) {
      return;
    }

    // Broadcast old logs
    this.notBroadcastedYet.forEach((text) => {
      this.log(text, true);
    });
  }

  /**
   * Log something
   *
   * @param {string} text
   * @param {boolean} broadcastOnly
   */
  log(text, broadcastOnly) {
    if (this.es) {
      this.es.push('log', text);
    }

    if (broadcastOnly === true) {
      return;
    }

    // Print in terminal
    console.log(text);

    // Couldn't broadcast yet, cache for later
    if (!broadcastOnly && !this.es) {
      this.notBroadcastedYet.push(text);
    }
  }
}

export default LogService;

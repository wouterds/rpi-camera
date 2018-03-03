import LogService from 'server/services/Log';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class Registry {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this._type = 'SingletonEnforcer';
    this.objects = {};

    LogService.instance.log('[Registry] Initializing..');
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Registry(singletonEnforcer);
    }

    return this[singleton];
  }

  static get(object) {
    if (!Registry.instance.objects.hasOwnProperty(object)) {
      switch (object) {
        case LogService:
          Registry.instance.objects[LogService] = LogService.instance;
          break;
      }
    }

    return Registry.instance.objects[object];
  }
}

export default Registry;

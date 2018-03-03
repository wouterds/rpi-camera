import LogService from 'server/services/Log';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class Registry {
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
    this.objects = {};

    LogService.instance.log('[Registry] Initializing..');
  }

  /**
   * Get singleton instance
   *
   * @return {Registry}
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Registry(singletonEnforcer);
    }

    return this[singleton];
  }

  /**
   * Get an object from registry, if it doesn't exist, try to create it
   *
   * @param {Object} object
   * @return {Object|null}
   */
  static get(object) {
    if (!Registry.instance.objects.hasOwnProperty(object)) {
      switch (object) {
        case LogService:
          Registry.instance.objects[LogService] = LogService.instance;
          break;
      }
    }

    if (Registry.instance.objects.hasOwnProperty(object)) {
      LogService.instance.log(`[Registry] Getting ${Registry.instance.objects[object].constructor.name} from registry..`);
      return Registry.instance.objects[object];
    }

    return null;
  }

  /**
   * Set an object to the registry, if it doesn't exist
   *
   * @param {Object} object
   */
  static set(object, instance) {
    LogService.instance.log(`[Registry] Setting ${instance.constructor.name} to registry..`);

    if (Registry.instance.objects.hasOwnProperty(object)) {
      return;
    }

    Registry.instance.objects[object] = instance;
  }
}

export default Registry;

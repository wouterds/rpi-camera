import LogService from 'server/services/Log';
import ServoService from 'server/services/Servo';

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

    LogService.instance.log('info', '[Registry] Initializing..');
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
      let instance = null;

      switch (object) {
        case LogService:
          instance = Registry.instance.objects[LogService] = LogService.instance;
          break;
        case ServoService:
          instance = Registry.instance.objects[ServoService] = new ServoService();
          break;
      }

      if (instance !== null) {
        LogService.instance.log('fail', `[Registry] Not found ${Registry.instance.objects[object].constructor.name} in registry, creating..`);
      }
    }

    if (Registry.instance.objects.hasOwnProperty(object)) {
      LogService.instance.log('ok', `[Registry] Fetched ${Registry.instance.objects[object].constructor.name} from registry!`);
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
    if (Registry.instance.objects.hasOwnProperty(object)) {
      LogService.instance.log('fail', `[Registry] Did not set ${instance.constructor.name} to registry, already exists!`);
      return;
    }

    LogService.instance.log('ok', `[Registry] Setting ${instance.constructor.name} to registry..`);

    Registry.instance.objects[object] = instance;
  }
}

export default Registry;

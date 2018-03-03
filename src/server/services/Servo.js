import { servo } from 'config';
import Registry from 'server/Registry';
import LogService from 'server/services/Log';
import { init } from 'raspi';
import { PWM } from 'raspi-pwm';

class ServoService {
  constructor() {
    this.logService = Registry.get(LogService);

    this.logService.log('[Services.Servo] Initializing..');

    // Init Raspberry Pi connection
    init(() => {
      this.logService.log('[Services.Servo] Connected to GPIO!');
      this.logService.log(`[Services.Servo] Initializing PWM on pin ${servo.pin}..`);

      // Init PWM
      this.servo = new PWM(servo.pin);

      // Test position
      this.testPosition();
    });
  }

  get position() {
    return this._position;
  }

  set position(position) {
    if (this.busy === true) {
      return;
    }

    if (this._position === position && typeof position === 'number') {
      return;
    }

    // Round
    position = Math.round(position * 100000) / 100000;

    // Move servo to new position
    this.servo.write(position);

    // If position = 0, don't cache
    if (position === 0) {
      return;
    }

    // Debugging
    this.logService.log(`[Services.Servo] New position, ${this._position} => ${position}`);

    // Cache position
    this._position = position;
  }

  moveRight() {
    if (this.position <= servo.pos.right) {
      return;
    }

    this.position = this.position - servo.step;
    this.busy = true;

    setTimeout(::this.stop, servo.delay);
  }

  moveLeft() {
    if (this.position >= servo.pos.left) {
      return;
    }

    this.position = this.position + servo.step;
    this.busy = true;

    setTimeout(::this.stop, servo.delay);
  }

  stop() {
    this.busy = false;
    this.position = servo.pos.off;
  }

  testPosition() {
    this.logService.log('[Services.Servo] Testing servo..');

    this.clearPosition(() => {
      let index = 1;
      for (let position = servo.pos.right; position < servo.pos.left; position += servo.step) {
        setTimeout(() => {
          this.position = position;
        }, servo.delay * index++);
      }

      setTimeout(::this.clearPosition, index * servo.delay);
    });
  }

  clearPosition(cb) {
    // Reset position
    this.position = servo.pos.middle;

    // Turn off
    setTimeout(() => {
      this.stop();

      if (typeof cb === 'function') {
        cb();
      }
    }, servo.delay);
  }
}

export default ServoService;

/* @echo EXPORT */
class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertation failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;
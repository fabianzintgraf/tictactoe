import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  constructor() {
    super();
  }

  dispatch(type, payload) {
    super.dispatch({
      type: type,
      payload: payload
    });
  }
}

export default new AppDispatcher();

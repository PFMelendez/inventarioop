import actions from './actions';

const initialState = {
  user: {},
  status: false
};

export default function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.setUser.type:
      return { ...state, user: { ...payload } };
    case actions.setStatus.type:
      return { ...state, status: payload };
    case actions.triggerLogout.type:
      return { ...initialState };
    default:
      return state;
  }
}
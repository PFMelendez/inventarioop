import actions from './actions';

const initialState = {
  user: {},
  status: false,
  loading: false,
};

export default function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.setUser.type:
      return { ...state, user: { ...payload } };
    case actions.setStatus.type:
      return { ...state, status: payload };
    case actions.endLogout.type:
      return { ...initialState };
    case actions.setLoading.type:
      return { ...state, loading: payload };
    default:
      return state;
  }
}
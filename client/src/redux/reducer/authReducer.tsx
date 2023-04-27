export interface AuthState {
    authenticated: boolean;
  }
  
  const initialState: AuthState = {
    authenticated: false,
  };
  
  const authReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {
      case 'SET_AUTHENTICATED':
        return {
          ...state,
          authenticated: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
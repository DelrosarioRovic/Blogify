export interface hoverState {
    isProfileHover: boolean;
  }
  
  const initialState: hoverState = {
    isProfileHover: false,
  };
  
  const hoverReducer = (state: hoverState = initialState, action: any) => {
    switch (action.type) {
      case 'isHover':
        return {
          ...state,
          isProfileHover: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default hoverReducer;
  
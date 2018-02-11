import Constants from "../constants";

const initialState = {
    opened: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Constants.TOGGLE_SIDE_BAR:
            return { ...state, opened: !action.payload }
        default:
            return state;
    }
};
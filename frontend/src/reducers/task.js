import Constants from "../constants";

const initialState = {

  //NEED TO DEFINE THE STATUS
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constants.LIST_ALL_TASKS:
      return { ...state, tasks: action.payload };
    case Constants.NOTE_ADDED:
      return { ...state, task: action.payload };
    case 'ADD_NOTE':
      let { task, note } = action.payload;
      console.log(note)
      console.log(task)
      let newList = state.tasks.map(e => {
        if(e._id === task._id) {
          return {...e, notes: [note, ...e.notes]}
        }
        return e
      })
      return { ...state, tasks: newList };
    default:
      return state;
  }
};

/* Dependencies */


/* Action Types */
const UPDATE_TEMPERATURE = 'UPDATE_TEMPERATURE'

export const updateTemperature = (tempNum) => ({
  type: UPDATE_TEMPERATURE,
  tempNum
});


/* Initial State */
const initialState = {
  temperature: 87
};

/* Reducer Function */
export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {

    case UPDATE_TEMPERATURE:
        newState.temperature = action.tempNum;
        console.log(newState);
        break;
    default:
        return newState;
  }
  return newState;
}

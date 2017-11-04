export const fetchRepo = () => ({ apis, actions, constants })=> {
  apis.repo().then(data => {
    actions.reducerActions.repo.FINISH_FETCH({ data });
    console.warn( ` the dispath will be desprecated in the feature, use auto mode and _reducers props instead`);
    // dispatch({
    //   type: constants.repo.FINISH_FETCH,
    //   data
    // })
  });
}

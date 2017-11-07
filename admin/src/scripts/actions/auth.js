export const profile = () => ({ apis, actions }) => {
  apis.profile().then(res => {
    const { reducerActions } = actions;
    console.log(reducerActions);
  })
}

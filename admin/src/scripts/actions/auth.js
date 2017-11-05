export const profile = () => ({ apis, reducerActions}) => {
  apis.profile().then(res => {
    console.log(res)
  })
  console.log(apis, reducerActions);
}

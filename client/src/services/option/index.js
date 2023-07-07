import request from '../http'
const getSuffixOption = () =>
  request.get({
    url: '/option/suffixOption',
  })
export { getSuffixOption }

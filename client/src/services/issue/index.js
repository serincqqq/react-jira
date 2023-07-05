import request from '../http'
const deleteStuInfo = (data) =>
  request.post({
    url: '/editsys/edu/student/delete',
    data,
  })

export { deleteStuInfo }

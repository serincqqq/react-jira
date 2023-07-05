import request from '../http'
const insertProject = (data) =>
  request.post({
    url: '/editsys/edu/student/delete',
    data,
  })

export { insertProject }

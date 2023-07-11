import request from '../http'
const getProjectDetail = (data) =>
  request.get({
    url: '/project/detail',
    params: {
      projectId: data,
    },
  })
const insertProject = (data) =>
  request.post({
    url: '/project/create',
    data,
  })
const getProject = () =>
  request.get({
    url: '/project/list',
  })
const editProject = (id, data) =>
  request.post({
    url: '/project/edit',
    params: {
      projectId: id,
    },
    data,
  })
const searchProject = (data, type) =>
  request.get({
    url: '/project/search',
    params: {
      searchQuery: data,
      searchType: type,
    },
  })
const deleteProject = (id) =>
  request.get({
    url: '/project/delete',
    params: {
      projectId: id,
    },
  })
export { deleteProject, getProjectDetail, editProject, insertProject, getProject, searchProject }

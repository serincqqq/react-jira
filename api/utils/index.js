 // 解构默认值
 function formatData({status = 200, data = [], msg = '操作成功'} = {}) {
  if(status === 0) {
      msg = "fail";
  } 
  return {
      status,
      data,
      msg
  }
}
module.exports = {
  formatData
}

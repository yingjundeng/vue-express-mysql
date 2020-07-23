const API_ROOT = 'http://localhost:3000'

module.exports = {
  //服务器路径
  API_ROOT,
  //数据分页
  PAGE_SIZE:10,
  //请求成功的code
  SERVER_SUCCESS_CODE:'0000',
  //请求超时时间
  REQUEST_TIMEOUT:30000,

  /**********    其他设置   ************** */

  //项目名
  title:'',
  //主题颜色
  theme:'dark',
  //设置漂浮按钮 true 显示  false 不显示
  showSettings: true,
  //布局方式 side 有左侧菜单 head 无左侧菜单
  layout: 'head',
}
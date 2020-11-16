import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj的install函数',Vue)
  // Vue.prototype.$toast = 对象;

  // toast对象最好是我们的Toast
  // 对象有自己的模板，把对象赋值给后，对象的模板并不会给添加上去
  // Toast有$el,
  // 添加到body上
  // 报错，行不通
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast

  // 1、创建组件构造器
  const toastConsructor = Vue.extend(Toast)

  // 2、通过new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConsructor()

  // 3、将我们的组件对象手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 这样才真正的把Toast对象的$el添加到界面上
  Vue.prototype.$toast = toast
}

export default obj
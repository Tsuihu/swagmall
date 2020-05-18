import Toast from './toast.vue'

const obj = {}
//执行install方法的时候本身就有一个参数是Vue，导入不导入都行
obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2.new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor();
  //3.将组件对象，手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el就是对应的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj

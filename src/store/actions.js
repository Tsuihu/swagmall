import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations_type'

export default {
  //添加到购物车中，cartList
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('商品已经在购物车中，当前商品数量+1')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品成功')
      }
    })
  },
  buyNow(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('商品已经在购物车中，当前商品数量+1')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品成功')
      }
    })
  }

}

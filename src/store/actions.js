import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations_type'

export default {
  addCart(context, payload) {
    // 1.查找之前数组中是否有该商品
    let oldProduct = state.cartList.find(item => item.iid === payload.iid);
    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNT, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload);
    }
  }
}

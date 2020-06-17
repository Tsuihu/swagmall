import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations_type'

export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  }
}

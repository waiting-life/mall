import {ADD_COUNTER,ADD_CART} from './mutations-types'
export default {
  // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点(只做一件事)
    // 异步或者比较复杂的,有判断逻辑的放在actions里面
    [ADD_COUNTER](state,payload) {
      payload.counter ++
    },
    [ADD_CART](state,payload) {
      payload.checked = true;
      state.cartList.push(payload)
    }
}
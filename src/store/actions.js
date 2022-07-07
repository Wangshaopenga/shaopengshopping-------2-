import {
    getCart
} from "network/cart";
import {
    addCart
} from "../network/cart";
import store from '../store'
const actions = {
    updateCart({
        commit
    }) {
        if (store.state.user.isLogin) {
            getCart().then(res => {
                commit('addCart', {
                    count: res.data.length || 0
                })
            })
        } else {
            commit('addCart', {
                count: 0
            })
        }
    }
}

export default actions;
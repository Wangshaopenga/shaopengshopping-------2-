const mutations = {
    setIsLogin(state,payload) {
        state.user.isLogin = payload;
    },
    addCart(state,payload) {
        state.cartCount = payload.count;
    },
    changeTabIndex(state,payload) {
        state.tabIndex = payload;
    }
}

export default mutations;
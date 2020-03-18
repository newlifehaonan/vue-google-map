const algebra = {
    namespaced: true,
    state: {
        count: 0,
        numBag: []
    },
    mutations: {
        increment(state) {
            state.count++
        },
        incrementBy(state, n) {
            state.count += n
        },
        decrement(state) {
            state.count--
        },
        addtobag(state, num) {
            state.numBag.push(num)
        }
    },
    getters: {
        getAll(state) {
            return state.numBag
        },
        getOddNum(state) {
            return state.numBag.filter(num => num%2 === 0)
        },
        getLength(state) {
            return state.numBag.length
        },
        getCurrentNum(state) {
            return state.count
        }
    },
    actions: {
        asyncIncrementBy({commit,getters}, n) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('incrementBy', n)
                    resolve(getters.getCurrentNum)
                }, 1000)
            })
        }
    }
}

export default algebra
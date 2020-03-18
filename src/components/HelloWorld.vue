<template>
<div>
  <span>Type the number you want to add:</span>
  <input v-model="num" placeholder="edit me" />
  <p>Message is: {{ num }}</p>
  <button @click="addNumToBag" style="display: block">Click me to Add to the Number Bag</button>
  <button @click="increment" style="display: block">+</button>
  <button @click="decrement" style="display: block">-</button>
  <button @click="incrementBy" style="display: block">+=</button>
  <p>current count : {{ count }}</p>
  <p>Total: {{ getLength }}</p>
  <p>ALL: {{ getAll }}</p>
  <p>ODD: {{ getOddNum }}</p>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      num: 0
    }
  },
  computed: {
    ...mapGetters('algebra', [
      'getAll',
      'getOddNum',
      'getLength'
    ]),
    ...mapState('algebra',{
      count: state => state.count
    })
  },
  methods: {
    ...mapMutations('algebra', [
      'increment',
      'decrement',
      'addtobag',
    ]),
    ...mapActions('algebra', [
      'asyncIncrementBy'
    ]),
    isNumber(input) {
      if (typeof input === 'number') {
        return true
      }
      return false
    },
    addNumToBag() {
      this.addtobag(this.num)
    },
    incrementBy() {
      this.asyncIncrementBy(this.num).then(
        (value) => {
          this.num = value
          console.log(value)
        }
      )
    }
  }
}
</script>
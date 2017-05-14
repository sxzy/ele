<template>
  <div class="cart">
  <div class="minus" v-show="food.count" v-on:click.prevent="minus()">
    <i class="fa fa-minus-circle" aria-hidden="true"></i></div>
  <div class="quantity" v-show="food.count">{{food.count}}</div>
  <div class="plus" v-on:click.prevent="add()"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
  </div>
</template>
<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      minus: function () {
        if (this.food.count > 0) {
          this.food.count --
        } else if (this.food.count === 1) {
          console.log('消失吧')
        }
        this.$emit('minus')
      },
      add: function () {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count ++
          console.log(this.food.count)
        }
        this.$emit('add')
        this.$emit('set-food', this.food.count)
      }

    },
    mounted: function () {
      this.$nextTick(function () {
//        this.food = {}
        console.log(this.food)
      })
    }
  }
</script>
<style>
  .cart {
    color: deepskyblue;
  }
  .plus {
    display: inline-block;
  }
  .minus {
    display: inline-block;
  }
  .quantity {
    display: inline-block;
    margin: 0 15px;
  }
</style>

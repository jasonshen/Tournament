<template lang="html">
  <div class="TemplateComponent">
    <p>This is a component template</p>
    <p>Make a copy of this file to build your new component</p>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'TemplateComponent', // Change name
    mixins: [],
    extends: {},
    props: {
      // Specify props, type, and validators
      // basic type check (`null` means accept any type)
      // propA: Number,
      // propB: [String, Number],
      // propC: {
      //  type: String,
      //  required: true
      // },
      // propD: {
      //  type: Number,
      //  default: 100
      // },
      // propE: {
      //  type: Object,
      //  default: function () {
      //    return { message: 'hello' }
      //  }
      // },
      // propF: {
      //  validator: function (value) {
      //    return value > 10
      //  }
      // }
    },
    data () {
      return {} // always return an object
    },
    computed: {},
    components: {},
    watch: {},
    methods: {},
    beforeCreate () {},
    mounted () {},
  }
</script>
<style lang="scss" scoped>
  .TemplateComponent {} // Update
</style>

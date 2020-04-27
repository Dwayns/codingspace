/* new Vue({
  el: "#app",
  data: {
    isButtonDisabled: false
  },
  methods: {
  	toggle: function(todo){
    	todo.done = !todo.done
    }
  }
}); */

var arrayMutations = new Vue({
    el: "#vfor-ex",
    data: {
        parentMessage: 'Parent',
        items: [
            { message: 'foo' },
            { message: 'bar' },
        ],
    },
    methods: {
        muteArray: function() {
            this.items.push({ test: 'toto'})
        }
    }
});

arrayMutations.items.push({ test: 'toto'});

/* arrayMutations.items = arrayMutations.items.filter(function (item) {
     return item.message.match(/Foo/)
}); */

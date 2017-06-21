(function ($) {
    var store = {
            commentState: false
        },
        methods = {
            toggleComment: function () {
                this.commentState = !this.commentState;
            }
        },
        appVm;
    appVm = new Vue({el: '#app', data: store, methods: methods})

})(jQuery)
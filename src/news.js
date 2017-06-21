(function ($) {
    var AppViewModal;
    $(document).ready(function () {
        /**
         * 程序状态
         */
        var selfclick = false;
        var store = {
                menuIndex: 0,
                searchWrapState: false
            },
            /**
             * 程序方法
             */
            methods = {
                searchWrapExpand:function(){
                    selfclick = true;
                    this.searchWrapState = true;
                    this.$nextTick(function(){
                        this.$refs.searchinput.focus();
                    }.bind(this))
                },
                searchWrapFold:function(){
                    if(selfclick){
                        selfclick = false;
                    }
                    this.searchWrapState = false;
                }
            };
        AppViewModal = new Vue({el: '#app', data: store, methods: methods});

        var docEl = document.documentElement,
            fontSize,
            resizeEvt = 'orientationchange' in window
                ? 'orientationchange'
                : 'resize',
            recalc = (function recalc() {
                var clientWidth = docEl.clientWidth;
                var docHeight = document.documentElement.offsetHeight;
                if (!clientWidth){
                    window.setTimeout(function(){
                        recalc();
                    },200)
                    return recalc;
                }
                fontSize = 12 * clientWidth / 380.600;
                docEl.style.fontSize = fontSize + 'px';
                return recalc;
            })();
        if (!document.addEventListener) 
            return;
        window.addEventListener(resizeEvt, recalc, false);
    })
})(jQuery)
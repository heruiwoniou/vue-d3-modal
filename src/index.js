(function () {
    $(document)
        .ready(function () {
            var docEl = document.documentElement,
                resizeEvt = 'orientationchange' in window
                    ? 'orientationchange'
                    : 'resize',
                recalc = (function recalc() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) 
                        return;
                    docEl.style.fontSize = 12 * clientWidth / 380.600 + 'px';
                    return recalc;
                })();
            if (!document.addEventListener) 
                return;
            window.addEventListener(resizeEvt, recalc, false);
            document.addEventListener('DOMContentLoaded', recalc, false);
        })
})(jQuery)
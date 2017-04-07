export let maskManager = {
    zIndex: 5000,
    masks: [],
    mask: null,
    setDom() {

        if (!!!this.mask) {
            this.mask = document.createElement('div');
            this.mask.className = 'vue-mask';
        }

        if (document.querySelector('.vue-mask') == null) 
            document.body.appendChild(this.mask);
        
        this.mask.style.zIndex = this.zIndex + this.masks.length * 2 - 1;
    },
    setIndex(el, state) {
        el.style ?  el.style.zIndex = this.zIndex + this.masks.length * 2 - (state ? 1 : 0) :  undefined;
    },
    create(o) {
        this.setDom();
        this.masks.push(o._uid);
        this.setIndex(this.mask, true);
        this.setIndex(o.$el);
    },
    remove(o) {
        if (this.mask.length > 0) {
            this.mask.splice(_.chain(this.masks).findIndex(o => o.id == o._uid).value(), 1)
        } else {
            this.mask = [];
            this.mask.parentNode.removeChild(this.mask);
        }
    }
}
export default {
    data() {
        return {visible: false, zIndex: 0}
    },
    beforeDestroy() {
        this.$emit('beforeDestroy');
    },
    methods : {
        open() {
            return new Promise((resolve, reject) => {
                this.visible = true;
                this.resolve = resolve;
                this.reject = reject;
                maskManager.create(this);
            })
        },
        close() {
            this.visible = false;
            maskManager.remove(this);
        }
    }
}
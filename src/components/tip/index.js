import tipbase from './tip.vue';
let tipConstructor = Vue.extend(tipbase);
let tipPool = {};
/**
 * create modal
 * @function Tip
 * @memberof WebApi
 * @param {Object} options - 弹框参数对象
 * */
function Tip(event, src) {
    let instance = new tipConstructor({
        el: document.createElement('div'),
        propsData: {
            src: src,
            x: event.x,
            y: event.y
        }
    });
    tipPool[instance._uid] = instance;
    document
        .body
        .appendChild(instance.$el);

    return new Promise(function (resolve, reject) {
        instance
            .open()
            .then(function (cmd) {
                instance
                    .$el
                    .parentNode
                    .removeChild(instance.$el);
                delete tipPool[instance._uid];
                instance.$destroy();
                instance = null;
                resolve(cmd);
            });
    });
}

export function closeAllTip() {
    for (var key in tipPool) {
        tipPool[key].close();
    }
};

export default Tip;

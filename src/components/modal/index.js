import modalbase from './modal.vue';
let modalConstructor = Vue.extend(modalbase);
let modals = {};
window.aa = modals;
/**
 * create modal
 * @function modal
 * @memberof WebApi
 * @param {Object} options - 弹框参数对象
 * @param {string} options.title - 标题
 * @param {number} options.width - 宽度
 * @param {numbe} options.height - 高
 * @return {promise} promise - promise.then(resolve,reject)
 */
export default function modal(options = {}){
    let instance ;
    let defaultOptions = {
        name: options.name || Math.round(Math.random()*1000),
        title: options.title || '',
        width: options.width || document.documentElement.offsetWidth,
        height: options.height || document.documentElement.offsetHeight,
        background: options.background || 'black'
    };
    if(modals[defaultOptions.name]) {
        console.error('已存在相同命名的弹框 ' + defaultOptions.name);
    }
    instance = new modalConstructor({
        el: document.createElement('div'),
        propsData: defaultOptions
    });
    document.body.appendChild(instance.$el);
    modals[defaultOptions.name] = instance;

    return new Promise(function(resolve,reject){
        instance.open().then(function(){
            instance.$el.parentNode.removeChild(instance.$el);
            delete modals[defaultOptions.name];
            resolve();
        });
    });
}
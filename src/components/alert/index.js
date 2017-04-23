import alertbase from './alert.vue';
let alertConstructor = Vue.extend(alertbase);
let alerts = {};
/**
 * create modal
 * @function modal
 * @memberof WebApi
 * @param {Object} options - 弹框参数对象
 * @param {string} options.name - 窗体名称
 * @param {string} options.title - 标题
 * @param {number} options.width - 宽度
 * @param {number} options.height - 高
 * @param {number} options.titleHeight - 标题高
 * @param {number} options.borderRadius - 圆角
 * @param {number} options.closeIconSize - 关闭按钮尺寸
 * @param {string} options.background - 背景
 * @param {string} options.src - 地址
 * @return {promise} promise - promise.then(resolve,reject)
 */
function Alert(options = {}) {
    let instance;
    let defaultOptions = _.assign({
        name: Math.round(Math.random() * 1000),
        message: '',
        title: '消息',
        titleHeight: 60,
        borderRadius: 8
    }, _.isPlainObject(options)
        ? options
        : {
            message: options
        });
    instance = new alertConstructor({
        el: document.createElement('div'),
        propsData: defaultOptions
    });
    document
        .body
        .appendChild(instance.$el);
    alerts[defaultOptions.name] = instance;

    return new Promise(function (resolve, reject) {
        instance
            .open()
            .then(function (cmd) {
                instance
                    .$el
                    .parentNode
                    .removeChild(instance.$el);
                delete alerts[defaultOptions.name];
                resolve(cmd);
            });
    });
}

export default Alert
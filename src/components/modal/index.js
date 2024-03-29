import modalbase from './modal.vue';
let modalConstructor = Vue.extend(modalbase);
let modals = {};
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
 * @param {boolean} options.draggable - 是否可拖拽
 * @param {object} options.offset - iframe偏移属性
 * @param {number} options.offset.left - ifrmae左偏移
 * @param {number} options.offset.top - iframe上偏移
 * @param {number} options.borderRadius - 圆角
 * @param {number} options.closeIconSize - 关闭按钮尺寸
 * @param {string} options.background - 背景
 * @param {string} options.src - 地址
 * @return {promise} promise - promise.then(resolve,reject)
 */
function Modal(options = {}) {
    let instance;
    let defaultOptions = {
        name: options.name || Math.round(Math.random() * 1000),
        title: options.title || '',
        width: options.width || document.documentElement.offsetWidth,
        height: options.height || document.documentElement.offsetHeight,
        titleHeight: options.titleHeight || 60,
        draggable: options.draggable || true,
        offset: {
            top: ( options.offset && options.offset.top ? options.offset.top : 0 ),
            left: ( options.offset && options.offset.left ? options.offset.left : 0 )
        },
        closeIconSize: options.closeIconSize || 20,
        borderRadius: options.borderRadius || 8,
        background: options.background || 'white',
        src: options.src || 'about:blank;',
        titleAlign: options.titleAlign || 'left'
    };
    if (modals[defaultOptions.name]) {
        console.error('已存在相同命名的弹框 ' + defaultOptions.name);
    }
    instance = new modalConstructor({
        el: document.createElement('div'),
        propsData: defaultOptions
    });
    document
        .body
        .appendChild(instance.$el);
    modals[defaultOptions.name] = instance;

    return new Promise(function (resolve, reject) {
        instance
            .open()
            .then(function (cmd) {
                instance
                    .$el
                    .parentNode
                    .removeChild(instance.$el);
                delete modals[defaultOptions.name];
                resolve(cmd);
            });
    });
}

/**
 * close all/single modal
 * @function close
 * @memberof WebApi
 * @param {object/string} options/cmd - 参数对象(当为对象且含name时,将对指定name窗体进行关闭)
 * @param {string} options.name - 窗体名称
 * @param {any} options.cmd - 返回参数
 */
export function close(options) {
    if (options && options.name) {
        modals[options.name].close(options.cmd || '')
    } else {
        _
            .forEach(modals, function (value, key) {
                modals[key].close(options
                    ? options
                    : undefined);
            })
    }
}

export default Modal
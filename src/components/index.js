import Modal , { close } from './modal';
import Tip , { closeAllTip } from './tip';
import Alert from './alert';
/**
 * @namespace {Object} WebApi
 */
export default {
    modal: Modal,
    close: close,

    alert: Alert,

    tip:Tip,
    closeAllTip:closeAllTip
}
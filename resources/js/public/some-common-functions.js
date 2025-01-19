/* 禁用拖拽和选取 */
document.addEventListener('dragstart', disableDefaultAction, false);
document.addEventListener('mousedown', disableDefaultAction, false);

function disableDefaultAction(event) {
    event.preventDefault();
}

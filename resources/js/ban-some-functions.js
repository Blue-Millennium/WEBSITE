/* 禁用拖拽 */
document.addEventListener('dragstart', function (event) {
    event.preventDefault();
}, false);
/* 禁用选取 */
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
}, false);
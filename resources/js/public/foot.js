document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const menuRef = header.getAttribute('data-menu-ref');
    const finalFooterRef = menuRef ? menuRef : 'resources/json/public/footer.json';
    fetch(finalFooterRef)
        .then(response => response.json())
        .then(footerItems => {
            const footer = document.getElementById('footer');

            footer.innerHTML = '';

            footerItems.forEach((item, index) => {
                if (item.disabled === 'true') {
                    return;
                }

                if (item.type === 'p') {
                    const p = document.createElement('p');
                    p.textContent = item.text;
                    footer.appendChild(p);
                } else if (item.type === 'a') {
                    const a = document.createElement('a');
                    a.textContent = item.text;
                    a.href = item.href;
                    a.className = item.className || '';

                    if (item.target) {
                        a.target = item.target;
                    }

                    footer.appendChild(a);

                    if (index < footerItems.length - 1) {
                        footer.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0'));
                    }
                }
            });
        })
        .catch(error => {
            console.error('页脚加载失败:', error);
        });
});

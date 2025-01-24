document.addEventListener('DOMContentLoaded', function() {
    const footerContent = [
        {
            type: 'p',
            text: '© 2024 Blue-Millennium. All rights reserved.'
        },
        {
            type: 'a',
            text: 'GitHub',
            href: 'https://github.com/Blue-Millennium',
            target: '_blank',
            class: 'text-blue'
        },
        {
            type: 'a',
            text: 'Tunite 组织官网',
            href: 'https://tunite.cn',
            target: '_blank',
            class: 'text-blue'
        },
        {
            type: 'a',
            text: '联系我们',
            href: 'mailto:suisuroru@blue-millennium.fun',
            class: 'text-blue'
        }
    ];

    const footer = document.getElementById('footer');

    footerContent.forEach(item => {
        if (item.type === 'p') {
            const p = document.createElement('p');
            p.textContent = item.text;
            footer.appendChild(p);
        } else if (item.type === 'a') {
            const a = document.createElement('a');
            a.textContent = item.text;
            a.href = item.href;
            if (item.target) {
                a.target = item.target;
            }
            if (item.class) {
                a.className = item.class;
            }
            footer.appendChild(a);
            const space = document.createTextNode('\u00A0\u00A0\u00A0\u00A0'); // 四个空格
            footer.appendChild(space);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navItems = [
        { text: '首页', href: 'index.html' },
        { text: '关于我们', href: 'about-us.html' },
        { text: '状态信息', href: 'https://stats.blue-millennium.fun', target: '_blank' },
        { text: '轨交线路图', href: 'https://map.blue-millennium.fun', target: '_blank' },
        { text: '加入我们', href: 'https://qm.qq.com/cgi-bin/qm/qr?k=N8TldcldaRkQXGFlXc_mTeYxqMnJ95es&jump_from=webapi&authKey=9rsk7N8LLGLdzwkoAO/qCZmPc4JaOfGbcGRfjFWgmkAdC1CbfDe7qifhu4FXtCf7', target: '_blank' }
    ];

    const navList = document.getElementById('nav-list');

    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.text;
        a.href = item.href;
        if (item.target) {
            a.target = item.target;
        }
        li.appendChild(a);
        navList.appendChild(li);
    });
});

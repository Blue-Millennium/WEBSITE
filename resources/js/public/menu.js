document.addEventListener('DOMContentLoaded', function () {
    const navItems = [
        {text: '首页', href: 'index.html'},
        {text: '关于我们', href: 'about-us.html'},
        {text: '状态信息', href: 'https://stats.blue-millennium.fun', target: '_blank'},
        {text: '模组服轨交线路图', href: 'map.html'},
        {
            text: '加入我们',
            href: 'https://qm.qq.com/cgi-bin/qm/qr?k=9_vS8M00KoSDvj8uVRQAYbZGFrIi_mdR&jump_from=webapi&authKey=EjtyVtpRe2zZQoxU0lJKK9BAFlb2sUNr2HfTjcm+OGDY/QSnpyiCQ9Eoan2acL7t',
            target: '_blank'
        }
    ];

    const navList = document.getElementById('nav-list');
    const hamburger = document.querySelector('.hamburger');

    if (!navList) {
        console.error('navList element not found');
        return;
    }

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

    // 添加汉堡菜单点击事件监听器
    hamburger.addEventListener('click', function () {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 获取文字区域的背景颜色并调整菜单颜色
    function adjustMenuColor(textColorForLightBackground, textColorForDarkBackground) {
        const header = document.querySelector('header');
        if (!header) {
            console.error('header element not found');
            return;
        }
        const customColor = header.getAttribute('data-text-color');
        const menuLinks = document.querySelectorAll('header nav ul li a, .menu a');
        const hamburgerSpans = document.querySelectorAll('.hamburger span');

        if (customColor) {
            console.log(customColor); // 检查 customColor 的值
            // 使用自定义颜色
            menuLinks.forEach(link => {
                link.style.color = customColor;
            });
            hamburgerSpans.forEach(span => {
                span.style.backgroundColor = customColor;
            });
        } else {
            const header = document.querySelector('header');
            const style = window.getComputedStyle(header);
            const backgroundColor = style.backgroundColor;

            // 将背景颜色从 rgba 格式转换为 rgb 格式
            const rgba = backgroundColor.match(/\d+/g);
            if (!rgba) return;

            const r = parseInt(rgba[0], 10);
            const g = parseInt(rgba[1], 10);
            const b = parseInt(rgba[2], 10);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            // 否则根据亮度设置颜色
            menuLinks.forEach(link => {
                link.style.color = mediaQuery.matches ? '#000' : brightness > 128 ? textColorForLightBackground : textColorForDarkBackground;
            });

            // 保持汉堡菜单颜色不变
            hamburgerSpans.forEach(span => {
                span.style.backgroundColor = brightness > 128 ? '#000' : '#fff';
            });
        }
    }

    // 调用 adjustMenuColor 函数并传递参数
    adjustMenuColor('#000', '#fff');
});

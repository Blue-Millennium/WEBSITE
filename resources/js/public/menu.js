document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const menuRef = header.getAttribute('data-menu-ref');
    const finalMenuRef = menuRef ? menuRef : 'resources/json/public/menu.json';
    fetch(finalMenuRef)
        .then(response => response.json())
        .then(menuItems => {
            const menuList = document.getElementById('nav-list');
            const hamburger = document.querySelector('.hamburger');
            menuList.innerHTML = '';
            menuItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = item.text;
                a.href = item.href;
                if (item.target) {
                    a.target = item.target;
                }
                li.appendChild(a);
                menuList.appendChild(li);
            });

            // 添加汉堡菜单点击事件监听器
            hamburger.addEventListener('click', function () {
                menuList.classList.toggle('active');
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
                const bgColor = header.getAttribute('data-bg-color');
                const menuLinks = document.querySelectorAll('header nav ul li a, .menu a');
                const hamburgerSpans = document.querySelectorAll('.hamburger span')
                const mediaQuery = window.matchMedia('(max-width: 768px)');

                if (bgColor) {
                    console.log(customColor);
                    if (bgColor === "clear") {
                        // do not do anything
                    } else {
                        header.style.backgroundColor = bgColor;
                    }
                } else {
                    header.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }

                if (customColor) {
                    console.log(customColor); // 检查 customColor 的值
                    // 使用自定义颜色
                    menuLinks.forEach(link => {
                        link.style.color = mediaQuery.matches ? '#000' : customColor;
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
        })
        .catch(error => {
            console.error('Error loading navigation items:', error);
            // 可以在这里添加备用菜单项或错误提示
        });
});

document.addEventListener('click', function (e) {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('header nav ul');

    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});

// 在现有代码的最后添加滚动检测
document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const bgColor = header.getAttribute('data-bg-color');
    
    // 只对透明背景的页面（如首页）添加滚动效果
    if (bgColor === 'clear') {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

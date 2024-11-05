document.addEventListener('DOMContentLoaded', function () {
    const teamMembersContainer = document.getElementById('team-members-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    const teamMembers = Array.from(teamMembersContainer.children);
    let itemsPerPage = 4; // 默认每页4个成员
    let currentPage = 1;
    let autoPageInterval;
    let isAutoPaging = false;

    function calculateItemsPerPage() {
        const containerWidth = teamMembersContainer.offsetWidth;
        if (containerWidth < 600) {
            itemsPerPage = 2; // 小屏幕每页2个成员
        } else if (containerWidth < 900) {
            itemsPerPage = 3; // 中等屏幕每页3个成员
        } else {
            itemsPerPage = 4; // 大屏幕每页4个成员
        }
    }

    function showPage(page) {
        calculateItemsPerPage();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        teamMembers.forEach((member, index) => {
            member.style.display = (index >= start && index < end) ? 'block' : 'none';
        });

        // 更新按钮状态
        prevPageButton.disabled = false;
        nextPageButton.disabled = false;
    }

    function autoNextPage() {
        if ((currentPage - 1) * itemsPerPage + itemsPerPage < teamMembers.length) {
            currentPage++;
        } else {
            currentPage = 1;
        }
        showPage(currentPage);
    }

    function startAutoPaging() {
        if (!isAutoPaging) {
            autoPageInterval = setInterval(autoNextPage, 5000); // 每5秒自动翻页
            isAutoPaging = true;
        }
    }

    function stopAutoPaging() {
        if (isAutoPaging) {
            clearInterval(autoPageInterval);
            isAutoPaging = false;
        }
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
        } else {
            currentPage = Math.ceil(teamMembers.length / itemsPerPage);
        }
        showPage(currentPage);
    });

    nextPageButton.addEventListener('click', () => {
        if ((currentPage - 1) * itemsPerPage + itemsPerPage < teamMembers.length) {
            currentPage++;
        } else {
            currentPage = 1;
        }
        showPage(currentPage);
    });

    teamMembersContainer.addEventListener('mouseenter', stopAutoPaging);
    teamMembersContainer.addEventListener('mouseleave', startAutoPaging);

    window.addEventListener('resize', () => {
        showPage(currentPage);
    });

    // 初始化时启动自动翻页
    startAutoPaging();

    showPage(currentPage);
});

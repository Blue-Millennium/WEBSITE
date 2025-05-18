const basePath = 'resources/json/private/update/';

// 第一步：获取 JSON 文件列表
fetch(basePath + 'index.json')
    .then(response => response.json())
    .then(fileList => {
        // 第二步：并行加载所有 JSON 文件
        const promises = fileList.map(file =>
            fetch(basePath + "logs/" + file)
                .then(res => res.json())
                .catch(err => {
                    console.error(`加载 ${file} 失败`, err);
                    return null;
                })
        );

        return Promise.all(promises);
    })
    .then(dataArray => {
        const logContainer = document.getElementById('update-log');

        dataArray.forEach((entry, index) => {
            if (!entry) return;

            const entryDiv = document.createElement('div');
            entryDiv.className = 'log-entry';

            const title = document.createElement('h2');
            title.textContent = `${entry.version} - ${entry.date}`;
            entryDiv.appendChild(title);

            const list = document.createElement('ul');
            entry.changes.forEach(change => {
                const item = document.createElement('li');
                item.textContent = change;
                list.appendChild(item);
            });
            entryDiv.appendChild(list);

            logContainer.appendChild(entryDiv);

            // 触发动画
            setTimeout(() => {
                entryDiv.classList.add('show');
            }, index * 100); // 每个条目延迟100ms出现
        });
    })
    .catch(error => {
        console.error("加载更新日志失败:", error);
    });

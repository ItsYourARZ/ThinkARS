// Exam Results News Fetching Script
const feedResults = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/education/exam-results/rssfeed.xml");
const apiResults = `https://api.rss2json.com/v1/api.json?rss_url=${feedResults}`;

        fetch(apiResults)
            .then(res => res.json())
            .then(data => {
                let html = "";
                data.items.forEach(item => {
                    html += `
                        <div class="news">
                            <h2 class="designer-text"><a href="${item.link}" target="_blank" class="a-tag">${item.title}</a></h2>
                            <p><small>${item.pubDate}</small></p>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                document.getElementById("exam-results").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("exam-results").innerHTML = "Error loading news.";
                console.error(err);
            });

// Fashion News Fetching Script
const feedFashion = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/lifestyle/fashion/rssfeed.xml");
const apiFashion = `https://api.rss2json.com/v1/api.json?rss_url=${feedFashion}`;

        fetch(apiFashion)
            .then(res => res.json())
            .then(data => {
                let html = "";
                data.items.forEach(item => {
                    html += `
                        <div class="news">
                            <h2 class="designer-text"><a href="${item.link}" target="_blank" class="a-tag">${item.title}</a></h2>
                            <p><small>${item.pubDate}</small></p>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                document.getElementById("fashion").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("fashion").innerHTML = "Error loading news.";
                console.error(err);
            });

// Technology News Fetching Script
const feedTech = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/technology/rssfeed.xml");
const apiTech = `https://api.rss2json.com/v1/api.json?rss_url=${feedTech}`;

        fetch(apiTech)
            .then(res => res.json())
            .then(data => {
                let html = "";
                data.items.forEach(item => {
                    html += `
                        <div class="news">
                            <h2 class="designer-text"><a href="${item.link}" target="_blank" class="a-tag">${item.title}</a></h2>
                            <p><small>${item.pubDate}</small></p>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                document.getElementById("technology").innerHTML = html;
            })

// Marketing News Fetching Script
const feedHealth = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/lifestyle/health/rssfeed.xml");
const apiHealth = `https://api.rss2json.com/v1/api.json?rss_url=${feedHealth}`;

        fetch(apiHealth)
            .then(res => res.json())
            .then(data => {
                let html = "";
                data.items.forEach(item => {
                    html += `
                        <div class="news">
                            <h2 class="designer-text"><a href="${item.link}" target="_blank" class="a-tag">${item.title}</a></h2>
                            <p><small>${item.pubDate}</small></p>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                document.getElementById("health").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("health").innerHTML = "Error loading news.";
                console.error(err);
            });

// Football News Fetching Script
const feedFootball = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/sports/football/rssfeed.xml");
const apiFootball = `https://api.rss2json.com/v1/api.json?rss_url=${feedFootball}`;
        fetch(apiFootball)
            .then(res => res.json())
            .then(data => {
                let html = "";
                data.items.forEach(item => {
                    html += `
                        <div class="news">
                            <h2 class="designer-text"><a href="${item.link}" target="_blank" class="a-tag">${item.title}</a></h2>
                            <p><small>${item.pubDate}</small></p>
                            <p>${item.description}</p>
                        </div>
                    `;
                });
                document.getElementById("football").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("football").innerHTML = "Error loading news.";
                console.error(err);
            });
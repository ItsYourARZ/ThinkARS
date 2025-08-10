
// Education News Fetching Script
const feedEdu = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml");
        const apiEdu = `https://api.rss2json.com/v1/api.json?rss_url=${feedEdu}`;

        fetch(apiEdu)
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
                document.getElementById("education").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("education").innerHTML = "Error loading news.";
                console.error(err);
            });

// Entertainment News Fetching Script
const feedEnt = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml");
        const apiEnt = `https://api.rss2json.com/v1/api.json?rss_url=${feedEnt}`;

        fetch(apiEnt)
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
                document.getElementById("entertainment").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("entertainment").innerHTML = "Error loading news.";
                console.error(err);
            });

// Lifestyle News Fetching Script
const feedLife = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/lifestyle/rssfeed.xml");
const apiLife = `https://api.rss2json.com/v1/api.json?rss_url=${feedLife}`;

        fetch(apiLife)
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
                document.getElementById("lifestyle").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("lifestyle").innerHTML = "Error loading news.";
                console.error(err);
            });

// Business News Fetching Script
const feedBusi = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml");
const apiBusi = `https://api.rss2json.com/v1/api.json?rss_url=${feedBusi}`;

        fetch(apiBusi)
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
                document.getElementById("business").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("business").innerHTML = "Error loading news.";
                console.error(err);
            });

// Cricket News Fetching Script
const feedCricket = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/cricket/rssfeed.xml");
const apiCricket = `https://api.rss2json.com/v1/api.json?rss_url=${feedCricket}`;
        fetch(apiCricket)
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
                document.getElementById("cricket").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("cricket").innerHTML = "Error loading news.";
                console.error(err);
            });

// World News Fetching Script
const feedWorld = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml");
const apiWorld = `https://api.rss2json.com/v1/api.json?rss_url=${feedWorld}`;

        fetch(apiWorld)
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
                document.getElementById("world").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("world").innerHTML = "Error loading news.";
                console.error(err);
            });

// Anime News Fetching Script
const feedAnime = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/entertainment/anime/rssfeed.xml");
const apiAnime = `https://api.rss2json.com/v1/api.json?rss_url=${feedAnime}`;
        fetch(apiAnime)
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
                document.getElementById("anime").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("anime").innerHTML = "Error loading news.";
                console.error(err);
            });

// Competitve Exams News Fetching Script
const feedComp = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/education/competitive-exams/rssfeed.xml");
const apiComp = `https://api.rss2json.com/v1/api.json?rss_url=${feedComp}`;

        fetch(apiComp)
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
                document.getElementById("competitive-exams").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("competitive-exams").innerHTML = "Error loading news.";
                console.error(err);
            });

// Music News Fetching Script
const feedMusic = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/entertainment/music/rssfeed.xml");
const apiMusic = `https://api.rss2json.com/v1/api.json?rss_url=${feedMusic}`;

        fetch(apiMusic)
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
                document.getElementById("music").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("music").innerHTML = "Error loading news.";
                console.error(err);
            });

// Sports News Fetching Script
const feedSports = encodeURIComponent("https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml");
const apiSports = `https://api.rss2json.com/v1/api.json?rss_url=${feedSports}`;
        fetch(apiSports)
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
                document.getElementById("sports").innerHTML = html;
            })
            .catch(err => {
                document.getElementById("sports").innerHTML = "Error loading news.";
                console.error(err);
            });
const rssFeeds = [
  { id: "rss-general-feed", category: "", url: "http://economictimes.indiatimes.com/News/rssfeeds/1715249553.cms" },
  { id: "rss-politics-feed", category: "", url: "https://www.thehindu.com/news/national/?service=rss" },
  { id: "rss-business-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms" },
  { id: "rss-health-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/2886704.cms" },
  { id: "rss-science-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/-2128672765.cms" },
  { id: "rss-sports-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms" },
  { id: "rss-tech-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/66949542.cms" },
  { id: "rss-entertainment-feed", category: "", url: "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms" },
];

const fetchRSSFeeds = async () => {
  for (const feed of rssFeeds) {
    try {
      // Use AllOrigins proxy to bypass CORS restrictions
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`);
      const data = await response.json();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "application/xml");

      const items = xmlDoc.querySelectorAll("item");

      // Get the container by ID
      const container = document.getElementById(feed.id);
      if (!container) continue;

      // Add category title
      container.innerHTML = `<h2>${feed.category}</h2>`;

      // Add articles to the container
      items.forEach((item, index) => {
        if (index < 5) { // Limit to 5 articles per category
          const title = item.querySelector("title")?.textContent || "No title";
          const link = item.querySelector("link")?.textContent || "#";
          const description = item.querySelector("description")?.textContent || "No description available.";

          const article = document.createElement("div");
          article.innerHTML = `
            <h3><a href="${link}" target="_blank">${title}</a></h3>
            <p>${description}</p>
          `;
          container.appendChild(article);
        }
      });
    } catch (error) {
      console.error(`Failed to load feed for ${feed.category}`, error);
    }
  }
};

function toggleInfo(link) {
  const section = link.closest('.section');
  section.classList.toggle("active");
  link.textContent = section.classList.contains("active") ? "View More" : "View Less";
}

fetchRSSFeeds();
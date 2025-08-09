from flask import Flask, render_template_string
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)

TEMPLATE = """
<!DOCTYPE html>
<html>
<head><title>HT Education News</title></head>
<body>
  <h1>Hindustan Times – Education News</h1>
  {% for item in items %}
    <div>
      <h2><a href="{{ item.link }}" target="_blank">{{ item.title }}</a></h2>
      <p>{{ item.pubDate }}</p>
      <p>{{ item.description }}</p>
    </div>
  {% endfor %}
</body>
</html>
"""

@app.route("/")
def home():
    url = "https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml"
    resp = requests.get(url)
    root = ET.fromstring(resp.content)

    items = []
    for item in root.findall('./channel/item'):
        items.append({
            "title": item.findtext('title'),
            "link": item.findtext('link'),
            "pubDate": item.findtext('pubDate'),
            "description": item.findtext('description'),
        })

    return render_template_string(TEMPLATE, items=items)

if __name__ == "__main__":
    app.run(debug=True)

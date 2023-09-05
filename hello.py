from flask import Flask, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests
from flask import request

app = Flask(__name__)
CORS(app)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Accept-Language': 'en-US, en;q=0.5'
}

def get_news(url, page=1):
    params = {'hl': 'en-IN', 'gl': 'IN', 'ceid': 'IN:en', 'start': (page-1)*10}
    webpage = requests.get(url, headers=HEADERS, params=params)
    soup = BeautifulSoup(webpage.content, "html.parser")
    data = soup.find_all(class_='IBr9hb')

    records = []
    for _ in data:
        href = str(_.find('a')['href'])
        href = href[1:]
        href = 'https://news.google.com' + href
        title = _.find('h4').getText()
        image_url = ''
        if _.find('figure') and _.find('figure').find('img') and _.find('figure').find('img').has_attr('srcset'):
                image_Url = _.find('figure').find('img')['srcset']
                image_url = image_Url.split(',')[0].strip().replace(' 1x', '')
                image_url1 = image_Url.split(',')[1].strip().replace(' 2x', '')
                img_src = _.find('figure').find('img')['src']
        time = _.find('time').getText()
        editor_url = _.find('span').getText()
        items = {
                'href': href,
                'title': title,
                'ImageUrl' : image_url,
                'backupUrl' : image_url1,
                'altImg' : img_src,
                'time' : time,
                'editorUrl' : editor_url
        }
        records.append(items)
    result = {
        'totalResults': len(records),
        'articles': records
    }

    return result

@app.route('/general')
def home():
    page = request.args.get('page', default=1, type=int)
    url = "https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en"
    news = get_news(url,page=page)
    return jsonify(news)

@app.route('/india')
def india():
    page = request.args.get('page', default=1, type=int)
    url = "https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRE55YXpBU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url,page=page)
    return jsonify(news)

@app.route('/world')
def world():
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)

@app.route('/business')
def business():
    page = request.args.get('page', default=1, type=int)
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url, page=page)
    return jsonify(news)

@app.route('/technology')
def technology():
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)

@app.route('/entertainment')
def entertainment():
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)

@app.route('/sports')
def sports():
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)

@app.route('/science')
def science():
    url = "https://news.google.com/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)

@app.route('/health')
def health():
    url = "https://news.google.com/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-IN&gl=IN&ceid=IN%3Aen"
    news = get_news(url)
    return jsonify(news)


if __name__ == '__main__':
    app.run()
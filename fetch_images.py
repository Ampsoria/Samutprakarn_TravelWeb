import urllib.request
import json
import urllib.parse

places = [
    "Erawan Museum", 
    "Ancient Siam", 
    "Wat Asokaram", 
    "Bang Krachao", 
    "Samut Prakan Observation Tower",
    "Bhumibol Bridge",
    "Phra Samut Chedi"
]

for p in places:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(p)}&prop=pageimages&format=json&pithumbsize=800"
    try:
        req = urllib.request.urlopen(url)
        res = json.loads(req.read())
        pages = res['query']['pages']
        for k, v in pages.items():
            if 'thumbnail' in v:
                print(f"{p}: {v['thumbnail']['source']}")
            else:
                print(f"{p}: No image found")
    except Exception as e:
        print(f"Error for {p}: {e}")

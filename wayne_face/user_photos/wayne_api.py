import requests
import json

endpoint = "https://www.headlightlabs.com/api/"
headlight_key = "1aGfRTebPROdBWfxNEgsew"

def image_lookup(base64_image):
    url = endpoint + "gcpd_lookup"
    data = {
        'api_key': headlight_key,
        'image_contents': base64_image
    }

    response = requests.post(url, data=data)
    return json.loads(response.content)

def image_report(image_url):
    url = endpoint + "gcpd_report"
    image_res = requests.get(image_url)
    data = {
        'api_key': headlight_key,
        'image': image_res.content
    }

    response = requests.post(url, data=data)
    return json.loads(response.content)

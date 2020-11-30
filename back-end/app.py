from pandas.core.frame import DataFrame
import numpy as np
import pandas as pd
import tensorflow as tf
import requests, os, json, pickle, random

from flask_cors import CORS
from flask import Flask, request, jsonify
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import tokenizer_from_json

app = Flask(__name__)
CORS(app,  resources={r"*": {"origins": "*"}})

app.config["DEBUG"] = True

MAX_SEQ_LEN = 25
model = tf.keras.models.load_model('files/model.h5')
with open('files/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

@app.route('/predict', methods=['POST'])
def predit():
    try: 
        req = request.args.get('tweet')
        arr = np.array([req])
        vec = tokenizer.texts_to_sequences(arr)
        tweet = pad_sequences(vec, maxlen=MAX_SEQ_LEN)
        res = model.predict_classes(tweet)[0]
        
        return jsonify({
                "statusCode": 200,
                "status": "Prediction Made",
                "result": "Misogynist" if res == 1 else "Not Misogynist"
            })
    except Exception as error:
        return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })

@app.route('/tweets/getTweet', methods=['GET'])
def getTweet():
    bearer_token = auth()
    url, item = create_url()
    words = pd.read_csv("data/words.csv")
    df = pd.DataFrame(words)
    arr = df.to_numpy()

    print(url)
    headers = create_headers(bearer_token)
    json_response = connect_to_endpoint(url, headers)
    for i in range(len(arr)):
            if (arr[i][0] == item):
                arr[i][1] = json_response["meta"]["next_token"]
    df = pd.DataFrame(arr, columns=["word", "token"]) 
    df.to_csv("data/words.csv", index_label=False, index=False)
    json_response["WORD"] = item
    return json.dumps(json_response, indent=4, sort_keys=True)


def auth():
    return os.environ.get("BEARER_TOKEN")



def create_url():
    words = pd.read_csv("data/words.csv")
    df = pd.DataFrame(words)
    arr = df.to_numpy()
    rand = random.choice(arr)
    query = "{} -is:retweet".format(rand[0])
    # Tweet fields are adjustable 
    # Options include:
    # attachments, author_id, context_annotations,
    # conversation_id, created_at, entities, geo, id,
    # in_reply_to_user_id, lang, non_public_metrics, organic_metrics,
    # possibly_sensitive, promoted_metrics, public_metrics, referenced_tweets,
    # source, text, and withheld
    tweet_fields = "tweet.fields=author_id,created_at,geo,entities,possibly_sensitive"
    user_fields = "user.fields=profile_image_url"
    next_token = "next_token=" + str(rand[1]) if str(rand[1]) != str(0) else ""
    max_results = "max_results=" + str(10)
    print(next_token)
    url = "https://api.twitter.com/2/tweets/search/recent?query={}&{}&{}&{}&{}".format(
        query, tweet_fields, user_fields, next_token, max_results
    )
    return (url, rand[0])


def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers


def connect_to_endpoint(url, headers):
    response = requests.request("GET", url, headers=headers)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()








app.run()
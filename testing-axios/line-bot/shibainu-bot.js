'use strict';

const axios = require('axios');         // 追加
const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: 'f5b842af190e7f3b7a3d943923fd85f0',
    channelAccessToken: 'gVUmALJHSj2eFKOh6/GEUnFMYsYlppwmmeYjCNE8vf6SV6sUHXz4+scRCevRaSaH3oO/YzLLR74gWTqD/leMoXKEDMvnaS3ZO626es+52iHIT39TD+ErIT60XP1PRCGGoTiMQhindMUecv308A+F6QdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif文はdeveloper consoleの"接続確認"用なので後で削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'image',
    originalContentUrl: 'https://cdn.shibe.online/shibes/907fed97467e36f3075211872d98f407398126c4.jpg', 
    previewImageUrl: 'https://cdn.shibe.online/shibes/907fed97467e36f3075211872d98f407398126c4.jpg'
  });
}
app.listen(PORT);
console.log(`Server running at ${PORT}`);
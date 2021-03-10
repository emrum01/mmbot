//import { hello } from "./sub";
//import {doPost} from "./bot";
//import dayjs from "dayjs";

// sub.jsに定義されたJavaScriptを実行する。
var ACCESS_TOKEN = 'gVUmALJHSj2eFKOh6/GEUnFMYsYlppwmmeYjCNE8vf6SV6sUHXz4+scRCevRaSaH3oO/YzLLR74gWTqD/leMoXKEDMvnaS3ZO626es+52iHIT39TD+ErIT60XP1PRCGGoTiMQhindMUecv308A+F6QdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    
    var post_json = JSON.parse(e.postData.contents);
    var reply_token = post_json.events[0].replyToken;
    if (typeof reply_token === 'undefined') {
      return;
    }
    var url = 'https://api.line.me/v2/bot/message/reply';
     
     //実際にメッセージを送信する関数
    
      
      var headers = {
        "Content-Type" : "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
      };
     
      var postData = {

        'replyToken': reply_token,
        "messages" : [
          {
            'type':'image',
            'originalContentUrl':'https://drive.google.com/uc?id=1ENy_kq0ar21uWQj8-SPwSiZMFjyGgY1y',
            'previewImageUrl':'https://drive.google.com/uc?id=1ENy_kq0ar21uWQj8-SPwSiZMFjyGgY1y'
          }
        ]
      };
     
      var options = {
        "method" : "post",
        "headers" : headers,
        "payload" : JSON.stringify(postData)
      };

      return UrlFetchApp.fetch(url, options);
  }

global.doPost = doPost //ここに()付けると失敗したw



//gasとwebpackと関連ライブラリのバージョンは落とした

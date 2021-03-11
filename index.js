function mmbot(){

  function getMapsID() {
      var mapsToReview = [];
      const now = dayjs.dayjs().format('YYYY-MM-DD');
      var response = UrlFetchApp.fetch("https://www.mindmeister.com/services/rest/oauth2?method=mm.maps.getList", {
        headers: {
          Authorization: "Bearer " + "ad9a02febfcff1bc433b8dc4128b384e68598185578f0bc2a36955cc5f8f4c4c"
        }
      }).getContentText()
      var mapData;
      mapData = JSON.parse(response);
      for(let i=0; i<mapData.rsp.maps.total; i++){
      let mapCreated = mapData.rsp.maps.map[i].created
      mapCreated = dayjs.dayjs(mapCreated).format('YYYY-MM-DD')
      if(now===mapCreated
        || dayjs.dayjs(now).add(-1,'d').format('YYYY-MM-DD')===dayjs.dayjs(mapCreated).format('YYYY-MM-DD')
        || dayjs.dayjs(now).add(-7,'d').format('YYYY-MM-DD')===dayjs.dayjs(mapCreated).format('YYYY-MM-DD')
        || dayjs.dayjs(now).add(-30,'d').format('YYYY-MM-DD')===dayjs.dayjs(mapCreated).format('YYYY-MM-DD')
        || dayjs.dayjs(now).add(-90,'d').format('YYYY-MM-DD')===dayjs.dayjs(mapCreated).format('YYYY-MM-DD')){
        mapsToReview.push(mapData.rsp.maps.map[i].id);
      }
    }
    return mapsToReview;
  }

  function getMapsToReview(){
    let result = getMapsID();
    let url = [];
    for(let i=0; i<result.length; i++){
      url.push("https://www.mindmeister.com/api/v2/maps/"+ result[i] +".jpeg");
    }
    console.log(url)
    return url;
  }

  function Download(saveFolder, url){
    // url を指定してファイルを受け取る
  
    var response = UrlFetchApp.fetch(url,{
      headers: {
        Authorization:
          "Bearer " +
          "ad9a02febfcff1bc433b8dc4128b384e68598185578f0bc2a36955cc5f8f4c4c"
      }
    });
    console.log("Download: " + url + "\n => " + saveFolder.getName());
    // Google Drive で保存するファイル名をセット
    var fileName = url.split('/').pop();
    var fileBlob = response.getBlob();
    fileBlob.setName(fileName);
  
   // ファイル名がかぶっていたら、前のものは削除する 
   // (Google Drive の場合、名前がかぶっていても上書き対象にはならない)
   var itr = saveFolder.getFilesByName(fileName);
   if( itr.hasNext() ) {
     saveFolder.removeFile(itr.next());
   }
   // 新規ファイルとして保存
   
  var file = DriveApp.createFile(fileBlob);
  
  // 保存した画像に共有権を設定する (リンクを知っている全員が閲覧可)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // 画像のファイルIDを取得する
  var fileId = file.getId();
  return fileId;
  }
  
  function FindOrCreateFolder(folderName) {
    // 指定 ID のフォルダを取得する
    // (ID はそのフォルダの URL https://drive.google.com/drive/folders/XXXX の XXXX の部分がフォルダ ID)       
      const FOLDER_ID = `1fjbYyR1WVbG-6Gk3ceyUz3U-DnUkuB-3`;
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var itr = folder.getFoldersByName(folderName);
      if( itr.hasNext() )  {
        // フォルダが見つかった場合はそれを返す
        return itr.next();
      }
      // フォルダが見つかった場合は作成して返す
      var newFolder = folder.createFolder(folderName);
      newFolder.setName(folderName);
      return newFolder;
    }
  
    function TestSaveFile(){
      var folder = FindOrCreateFolder("テスト用");
      var urls = getMapsToReview();
      var imageIds = [];
      for(let i =0;i<urls.length;i++){
        console.log(urls[i]);
        imageIds.push(Download(folder, urls[i]));
      }
      return imageIds;
    }
  
    function pushLineBot(){
      var originalBase = 'https://drive.google.com/uc?export=view&id=';
      var previewBase  = 'https://drive.google.com/thumbnail?sz=w240-h240&id=';
      var fileIds = TestSaveFile();
      var pushLINE  = 'https://api.line.me/v2/bot/message/push';
      var CHANNEL_ACCESS_TOKEN = 'gVUmALJHSj2eFKOh6/GEUnFMYsYlppwmmeYjCNE8vf6SV6sUHXz4+scRCevRaSaH3oO/YzLLR74gWTqD/leMoXKEDMvnaS3ZO626es+52iHIT39TD+ErIT60XP1PRCGGoTiMQhindMUecv308A+F6QdB04t89/1O/w1cDnyilFU=';
      var userId = 'U2261ae7fc767ce215adb531d68762873';
  
      // Googleドライブ上の画像をLINEへプッシュ
      for(let i=0; i<fileIds.length;i++){
        UrlFetchApp.fetch(pushLINE, {
          'headers': {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
          },
          'method' : 'post',
          'payload': JSON.stringify({
            'to': userId,
            'messages' : [{
              'type': 'image',
              'originalContentUrl': originalBase + fileIds[i],
              'previewImageUrl'   : previewBase  + fileIds[i]
            }]
          })
        });
      }
    }
    pushLineBot();
  }
# mmbot

### マインドマップのリマインドアプリ

mindmeister(https://www.mindmeister.com/)
に作成したマインドマップの画像を忘れそうなタイミングでlineに送信してくれます
<img src="https://user-images.githubusercontent.com/44839683/116106236-02d67080-a6ed-11eb-85c3-d1f077577a3a.jpg" width="320">

<img src="https://user-images.githubusercontent.com/44839683/116106441-0f5ac900-a6ed-11eb-9898-046d83d57d12.jpg" width="320">

* アーキテクチャ
<img src="https://user-images.githubusercontent.com/44839683/116106908-7e382200-a6ed-11eb-8c27-e4f147bee4d0.png" width="320">

完全に自分用に作ったので、自分のmindmeisterのアカウントのapiトークンをそのまま使用しています。

**使用する場合は以下の手順から再現できると思います。**

1. mindmeisterのアカウントを作ったうえで(有料かもしれません)、以下のURLのページの手順に従ってapiトークンを取得
https://developers.mindmeister.com/docs/basic-steps

2. line messaging apiでボット作成、`チャンネルアクセストークン`を控えておく

3. googleAppsScriptでプロジェクトを作成し、index.jsをコピペ

4. index.js内のスクリプトプロパティ部分を設定する

<img src="https://user-images.githubusercontent.com/44839683/116107974-73ca5800-a6ee-11eb-906d-85331b7faec9.png">

* スクリプトプロパティはアクセストークンなどを隠蔽してくれるgasの仕様です。
(スクリプトプロパティについてはこちらhttps://auto-worker.com/blog/?p=2365)

readmeは書きなれていないので読みづらくなってしまい申し訳ないです。

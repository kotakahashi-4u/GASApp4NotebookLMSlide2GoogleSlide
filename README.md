# GASApp4NotebookLMSlide2GoogleSlide

## プロジェクトについて
Google Apps Scriptを用いて、NotebookLMで出力したPDF形式のスライド資料をGoogleスライドに取り込む（画像として背景に設定する）。

## 前提条件
本アプリケーションは、Chrome拡張機能である「Enhancer 4 Google」の付帯アプリケーションとして動作する。

## デプロイ手順
1. Googleドライブ上からGoogle Apps Scriptをスタンドアロン型で作成する。
2. スクリプトエディタ上に本リポジトリのcode.gsの内容を貼り付ける。
3. GASの認証処理を行うため、processBatchSlidesを実行する。  
   ※引数エラーになるのだが、ここでは認証を行いたいためなので、問題なし。
4. デプロイから「新しいデプロイ」を選択し、Webアプリとしてデプロイを行う。その際、以下のように設定を行う。  
   1. 次のユーザーとして実行: 自分
   2. アクセスできるユーザー: 全員
5. デプロイが完了したら、デプロイURLが発行されるため、コピーして「Enhancer 4 Google」のGoogleスライド設定に用いる。
   

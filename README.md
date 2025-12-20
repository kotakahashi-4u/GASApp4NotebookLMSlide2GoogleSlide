# GASApp4NotebookLMSlide2GoogleSlide

## プロジェクトについて
Google Apps Scriptを用いて、NotebookLMで出力したPDF形式のスライド資料をGoogleスライドに取り込む（画像として背景に設定する）。

## 前提条件
本アプリケーションは、Chrome拡張機能である「Enhancer 4 Google」の付帯アプリケーションとして動作する。

## デプロイ手順
1. Googleドライブ上からGoogle Apps Scriptをスタンドアロン型で作成する。  
   <img width="322" height="146" alt="Image" src="https://github.com/user-attachments/assets/981d3934-01cd-4488-a886-08f3f1b623c7" />  
   ↓  
   <img width="506" height="485" alt="Image" src="https://github.com/user-attachments/assets/41a2f63e-f69a-4de9-8452-e483b0ee2395" />  
2. スクリプトエディタ上に本リポジトリのcode.gsの内容を貼り付ける。
   <img width="594" height="241" alt="Image" src="https://github.com/user-attachments/assets/473ef00e-b9f0-4b07-b007-bf0825e9a53f" />  
3. GASの認証処理を行うため、processBatchSlidesを実行する。
   1. 実行関数からprocessBatchSlidesを選択する。
      <img width="718" height="246" alt="Image" src="https://github.com/user-attachments/assets/8884ee35-ea0f-4369-a4f3-7cf889afec13" />  
   2. 実行ボタンを押下する。
      <img width="779" height="242" alt="Image" src="https://github.com/user-attachments/assets/935f6023-ef1d-4e7c-8f29-b42e1daa92dd" />  
   3. 承認ダイアログが表示されるため、「権限を確認」を押下する。  
      <img width="430" height="181" alt="Image" src="https://github.com/user-attachments/assets/620376f1-570c-4de6-a920-4366c22a03dd" />  
   4. ご自身のアカウントを選択する。  
      <img width="496" height="607" alt="Image" src="https://github.com/user-attachments/assets/268bc868-a75c-4465-9e87-e4e1492bc1e0" />  
   5. 「続行」を押下する。  
      <img width="493" height="809" alt="Image" src="https://github.com/user-attachments/assets/f7efb088-60aa-4184-a15d-add1c887341c" />  
   ※引数エラーになるが、ここでは認証を行いたいためなので、問題なし。  
       <img width="541" height="164" alt="Image" src="https://github.com/user-attachments/assets/410caef0-630c-4b87-ac70-6eb39259c2f1" />
4. GASエディタの「デプロイ」ボタンから「新しいデプロイ」を選択する。  
   <img width="1312" height="209" alt="Image" src="https://github.com/user-attachments/assets/96ba2a9f-cdd1-4804-a013-73a6e705aae4" />  
   ↓  
   <img width="1331" height="171" alt="Image" src="https://github.com/user-attachments/assets/1717cb97-cd88-4a5e-a77f-89b33bf7a46a" />
5. デプロイ構成ダイアログにて「⚙」マークを押下し、ウェブアプリを選択する。  
   <img width="578" height="455" alt="Image" src="https://github.com/user-attachments/assets/c09679d9-ca3c-472f-9125-cc4a55c0c1b3" />  
6. 以下のように設定を行ったうえで、「デプロイ」ボタンを選択する。
   1. 説明（任意）: ご自身がわかりやすい説明文を記載  
   2. 次のユーザーとして実行: 自分
   3. アクセスできるユーザー: 全員  
      <img width="579" height="461" alt="Image" src="https://github.com/user-attachments/assets/179bf28b-96a6-446b-b465-579fbdc6436c" />
7. デプロイが完了したら、デプロイURLが発行されるため、コピーして「Enhancer 4 Google」のGoogleスライド設定に用いる。  
   <img width="578" height="458" alt="Image" src="https://github.com/user-attachments/assets/c4afb9ad-142d-4b02-a8e7-5a1ecb348306" />

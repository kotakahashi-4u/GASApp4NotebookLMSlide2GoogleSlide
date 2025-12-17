/**
 * WebアプリとしてPOSTリクエストを受け取る (バッチ処理対応版)
 */
function doPost(e) {
  console.log("★doPost受信開始 (Batch Mode)");

  try {
    if (!e || !e.postData || !e.postData.contents) {
      console.error("エラー: データがありません");
      return outputJSON({ success: false, error: "No data" });
    }

    let json;
    try {
      json = JSON.parse(e.postData.contents);
    } catch (err) {
      return outputJSON({ success: false, error: "JSON Parse Error" });
    }

    const presId = json.presentationId;
    
    // 単体送信(旧)とバッチ送信(新)の両方に対応
    let slidesData = [];
    if (json.slides && Array.isArray(json.slides)) {
      slidesData = json.slides; // 新方式: 配列
    } else if (json.image) {
      slidesData = [json]; // 旧方式: 単一オブジェクトを配列化
    }

    console.log(`パラメータ確認 - ID: ${presId}, 枚数: ${slidesData.length}`);

    if (!presId) {
      return outputJSON({ success: false, error: "No presentationId" });
    }

    // 処理実行
    const results = processBatchSlides(presId, slidesData);
    
    return outputJSON({ success: true, results: results });

  } catch (globalErr) {
    console.error("★致命的なエラー: " + globalErr.toString());
    return outputJSON({ success: false, error: globalErr.toString() });
  }
}

function outputJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * バッチスライド追加処理
 * プレゼンテーションを1回だけ開き、ループで処理することで高速化
 */
function processBatchSlides(presentationId, slidesData) {
  try {
    console.log(`スライドを開いています... ID: ${presentationId}`);
    const pres = SlidesApp.openById(presentationId);
    
    // レイアウト取得 (最後に一回だけ取得)
    const layouts = pres.getLayouts();
    if (layouts.length === 0) throw new Error("レイアウトが存在しません");
    const safeLayout = layouts[layouts.length - 1];

    // ページサイズ取得
    const pageWidth = pres.getPageWidth();
    const pageHeight = pres.getPageHeight();

    const results = [];

    // ループ処理
    slidesData.forEach((item, index) => {
      try {
        if (!item.image) return;

        // 画像データのヘッダー除去 (PNG/JPEG両対応)
        // データ形式: "data:image/jpeg;base64,....."
        const base64Data = item.image.split(',')[1]; 
        const decoded = Utilities.base64Decode(base64Data);
        // Blob作成 (拡張子は便宜上jpgにするが、データヘッダーに従うのがベター)
        const blob = Utilities.newBlob(decoded, item.image.includes('png') ? 'image/png' : 'image/jpeg', `page_${item.page}.jpg`);

        // スライド追加
        const slide = pres.appendSlide(safeLayout);
        
        // プレースホルダー削除
        slide.getPlaceholders().forEach(ph => { try { ph.remove(); } catch(e){} });

        // 画像挿入
        const image = slide.insertImage(blob);
        
        // サイズ調整
        const imgWidth = image.getWidth();
        const imgHeight = image.getHeight();
        const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

        image.setWidth(imgWidth * scale);
        image.setHeight(imgHeight * scale);
        image.alignOnPage(SlidesApp.AlignmentPosition.CENTER);
        
        // ノート追加
        if (item.notes && item.notes.trim() !== "") {
          const notesPage = slide.getNotesPage();
          const shape = notesPage.getSpeakerNotesShape();
          if (shape) shape.getText().setText(item.notes);
        }

        results.push({ page: item.page, status: "ok" });

      } catch (innerErr) {
        console.error(`ページ処理エラー (Page ${item.page}): ${innerErr}`);
        results.push({ page: item.page, status: "error", msg: innerErr.toString() });
      }
    });

    return results;

  } catch (e) {
    console.error(`processBatchSlidesエラー: ${e.toString()}`);
    throw e;
  }
}

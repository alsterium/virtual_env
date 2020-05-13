// saveJsonData
// jsonデータをjsonファイルとして保存する
// jsonData : 

function saveJsonData(jsonData) {
  const fileName = "cameraPos.json";
  const data = JSON.stringify(jsonData);
  const link = document.createElement("a");
  link.href = "data:text/plain," + encodeURIComponent(data);
  link.download = fileName;
  link.click();
}
module.exports = saveJsonData;

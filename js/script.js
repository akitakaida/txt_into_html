//RESETボタンを押したとき
function reset() {
    document.location.reload();
}

//textをHTMLの形に成形
function transformer(text) {
    let row = text.split('\n');
    let title = document.getElementById('title').value;
    let newText = `<!DOCTYPE html><html lang='ja'><head><title>${title}</title></head><body>`;
    row.forEach(element => {
        if (element.indexOf('http://') > -1 || element.indexOf('https://') > -1) {
            newText += `<p><a href="${element}" target="blank">${element}</a></p>`
        } else {
            newText += `<p>${element}</p>`;
        }
    });
    newText += '</body></html>'
    return newText;
}

//ファイルを保存
function SaveToFile(FileName, Stream) {
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(new Blob([Stream], { type: "text/plain" }), FileName);
    } else {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([Stream], { type: "text/plain" }));
        //a.target   = '_blank';
        a.download = FileName;
        document.body.appendChild(a) //  FireFox specification
        a.click();
        document.body.removeChild(a) //  FireFox specification
    }
}

function run() {
    let name = document.getElementById('title').value;
    let text = document.getElementById("text").value;
    if (name != "" && text != "") {
        let Stream = transformer(text);
        SaveToFile(name + ".html", Stream);
    } else if( name == "" ) {
        alert("タイトルを入力してください");
    } else {
        alert("テキストを入力してください");
    }

}
//RESETボタンを押したとき
function reset() {
    document.location.reload();
}

//textをHTMLの形に成形
function transformer(text, title) {
    let row = text.split('\n');
    let newText = `<!DOCTYPE html><html lang='ja'><head><title>${title}</title></head><body>`;
    row.forEach(element => {
        if (element.indexOf('http') === -1) {
            newText += `<p>${element}</p>`;
        } else {
            newText += `<p><a href="${element}" target="blank">${element}</a></p>`
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
    let title = document.getElementById('title').value;
    let text = document.getElementById("text").value;
    if (document.getElementById("check").checked) {
        let row = text.split('\n');
        title = row[0];
    }
    if (title == "") {
        alert("タイトルを入力してください");
    } else if (text == "") {
        alert("テキストを入力してください");
    } else {
        let html = transformer(text, title);
        SaveToFile(title + ".html", html);
    }
}
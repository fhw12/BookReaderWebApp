const textElement = document.getElementById('text');

function txtFormatRead(text){
    textElement.innerHTML = text.replaceAll('\n', '<br>');
}

function unknownFormat(){
    textElement.innerHTML = 'Unknown book format';
}

function fb2FormatRead(text){
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(text, 'text/xml');

    let output = '';

    const bookTitle = xmlDocument.querySelector('description > title-info > book-title').textContent;
    const bookDate = xmlDocument.querySelector('description > document-info > date').textContent;

    output += `${bookTitle} <br> ${bookDate}`;

    const body = xmlDocument.querySelector('body');

    output += body.innerHTML;

    textElement.innerHTML = output;
}

async function openBook(file){
    const FILE_NAME = file.name;
    const FILE_TEXT = await file.text();

    if(FILE_NAME.endsWith('.txt')){
        txtFormatRead(FILE_TEXT);
    } else if(FILE_NAME.endsWith('.fb2')){
        fb2FormatRead(FILE_TEXT);
    } else {
        unknownFormat();
    }
}

async function readFile(event){
    const file = event.target.files.item(0);
    openBook(file);
}
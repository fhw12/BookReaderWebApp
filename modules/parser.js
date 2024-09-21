class BookParser{
    constructor(file, outputElement){
        this.file = file;
        this.outputElement = outputElement;
    }

    async open(){
        const fileName = this.file.name;
        const fileText = await this.file.text();

        const documentParser = new TextDocumentParser(fileText);

        if(fileName.endsWith('.txt')){
            textElement.innerHTML = documentParser.parseTXT_Document();
        } else if(fileName.endsWith('.fb2')){
            textElement.innerHTML = documentParser.parseFB2_Document();
        } else {
            textElement.innerHTML = 'Unknown book format';
        }
    }
}

class TextDocumentParser{
    constructor(sourceText){
        this.sourceText = sourceText;
        this.output = '';
    }

    parseTXT_Document(){
        this.output = this.sourceText.replaceAll('\n', '<br>');
        return this.output;
    }

    parseFB2_Document(){
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(this.sourceText, 'text/xml');
        let tmpOutput = '';
    
        const bookTitle = xmlDocument.querySelector('description > title-info > book-title').textContent;
        const bookDate = xmlDocument.querySelector('description > document-info > date').textContent;    
        tmpOutput += `${bookTitle} <br> ${bookDate}`;
    
        const body = xmlDocument.querySelector('body');

        // for(let i = 0; i < body.innerHTML.length; i++){
        //     tmpOutput += '<span>' + body.innerHTML[i] + '</span>';
        // }
        
        tmpOutput += body.innerHTML;

        this.output = tmpOutput;
        return this.output;
    }
}
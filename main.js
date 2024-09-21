const textElement = document.getElementById('text');

async function openBookHandler(file){
    const bookParser = new BookParser(file, textElement);
    bookParser.open();
}

async function readFileEvent(event){
    const file = event.target.files.item(0);
    openBookHandler(file);
}

textElement.addEventListener('click', (e) => {
    const selection = window.getSelection();

    let range = selection.getRangeAt(0);
    let node = selection.anchorNode;

    if(range.toString() === ' '){
       selection.removeAllRanges();
        return;
    }

    while(range.startOffset > 0 && range.toString().indexOf(' ') != 0){
        range.setStart(node, (range.startOffset - 1));
    }

    while(
            [...range.toString()].reverse().join('').indexOf(' ') != 0
    ){
        try{
            range.setEnd(node, (range.endOffset + 1));
        } catch {
            break;
        }
    }

    if(range.toString() === ' '){
        selection.removeAllRanges();
        return;
    }

    let word = range.toString().toLowerCase();

    let formattedWord = '';
    for(let i = 0 ; i < word.length; i++){
        let charCode = word.charCodeAt(i)
        if(
            (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) ||
            (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0))
        ){
            formattedWord += word.charAt(i);
        } else if(i > 1) {
            break;
        }
    }

    console.log(word);
    console.log(formattedWord);

    // selection.removeAllRanges();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${formattedWord}`).then(
        res => {
            if(res.status == 200){
                res.json().then(
                    result => {
                        console.log(result);
                    }
                )
            }
        }
    );
});
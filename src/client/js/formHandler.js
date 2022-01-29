

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if(regexp.test(formText)) {
        postRequestedData('http://localhost:8081/api', {urlOnTest:formText} ).then((res) => {
            document.getElementById("subjectivity").innerHTML = "Subjectivity : " + res.subjectivity
            document.getElementById("irony").innerHTML = "Irony : " + res.irony
            document.getElementById("score_tag").innerHTML = "Score Tag : " + res.score_tag
        })
    } else {
        alert('This is not a valid url, please try again')
    }
}

const postRequestedData = async (url = "", postBody={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },

        body: JSON.stringify(postBody)
    })
    try {
        const urlData = await response.json();
        return urlData;
    } catch (e) {
        console.log('error', e);
    }
}


export { handleSubmit }

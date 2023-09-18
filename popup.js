function setLocaleTexts() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const message = chrome.i18n.getMessage(element.getAttribute('data-i18n'));
        element.textContent = message;
    });
}
setLocaleTexts();
document.getElementById('auth').addEventListener('click', function() {
    const saveFieldArray = ['auth_token', 'ct0', 'guest_id']
    chrome.cookies.getAll({domain: 'twitter.com'}).then(cookies => {
        const cookiesMap = cookies.map(e => {
            return {
                name: e.name,
                value: e.value
            }
        }).filter(e => saveFieldArray.includes(e.name))
        const qrcodeElement = document.getElementById("qrcode");

        // Clear the contents of the qrcode element
        while (qrcodeElement.firstChild) {
            qrcodeElement.removeChild(qrcodeElement.firstChild);
        }
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 200,
            height : 200,
            correctLevel : QRCode.CorrectLevel.L
        });
        qrcode.clear();
        qrcode.makeCode(JSON.stringify(cookiesMap));
        // Show the modal
        document.getElementById('qrcodeModal').style.display = "block";
    });
});

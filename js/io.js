'use strict';
var submitBtn = document.getElementById('toGray');
var text = document.getElementsByClassName('result')[0];
var ajaxHeaders = {
    'Authorization': 'Basic RVhFQ1VTRVI6RXhlY3VzZXIx',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

var showResult = function() {
    text.innerText = 'nearly done...';
    $.ajax({
        type: 'POST',
        url: 'https://dbi342070trial.hanatrial.ondemand.com/mnist/api/show',
        headers: ajaxHeaders,
        crossDomain: true,
        success: function(data) {
            text.innerText = "Emmmm...... It's " + data + " !";
        }
    })
}

function upload() {
    text.innerText = 'waiting...';
    var rgba = ctx.getImageData(0, 0, painter.width, painter.width).data;
    var gray = {
        "id": 1
    };
    for (var i = 0; i < rgba.length; i += 4) {
        // since we only have black color, R must be equal with G and B for every pixel
        console.assert(rgba[i] == rgba[i + 1] && rgba[i] == rgba[i + 2]);
        gray["p" + i / 4] = 255 - rgba[i];
    }
    // console.log(gray);

    $.ajax({
        type: 'POST',
        url: 'https://dbi342070trial.hanatrial.ondemand.com/mnist/api/list',
        headers: ajaxHeaders,
        crossDomain: true,
        data: JSON.stringify(gray),
        success: showResult
    });
}

submitBtn.addEventListener('click', upload);
document.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        upload();
    }
});

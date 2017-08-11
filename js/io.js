'use strict';
var submitBtn = document.getElementById('toGray');
var text = document.getElementsByClassName('result')[0];
var uploadMode = document.getElementById('uploadmode');
var statusLbl = document.getElementById('server-status');
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

function handleClick() {
    var gray = getPixel();
    if (uploadMode.checked) {
        var label = prompt("What is it?");
        var num1 = parseInt(label);
        if (num1 >= 0 && num1 <= 9) {
            upload(gray, num1);
        } else {
            alert('This is not a vaild number [0-9]');
        }
    } else {
        show(gray);
    }
}

function upload(gray, label) {
    text.innerText = 'uploading...';
    gray["label"] = label;
    $.ajax({
        type: 'POST',
        url: 'https://dbi342070trial.hanatrial.ondemand.com/mnist/api/upload',
        headers: ajaxHeaders,
        crossDomain: true,
        data: JSON.stringify(gray),
        success: function(data) {
            console.log(data);
            text.innerText = 'upload success!';
            document.getElementById('clear').click();
        },
        error: function(response) {
            text.innerText = response.responseJSON.error.message.value;
        }
    });
}

function getPixel() {
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
    return gray;

}

function show(gray) {
    text.innerText = 'waiting...';
    $.ajax({
        type: 'POST',
        url: 'https://dbi342070trial.hanatrial.ondemand.com/mnist/api/list',
        headers: ajaxHeaders,
        crossDomain: true,
        data: JSON.stringify(gray),
        success: showResult
    });
}

submitBtn.addEventListener('click', handleClick);
document.addEventListener('keypress', function(e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
        handleClick();
    }
});

$.ajax({
    url: 'https://dbi342070trial.hanatrial.ondemand.com/mnist/',
    headers: ajaxHeaders,
    crossDomain: true,
    success: function(data) {
        statusLbl.innerText = 'ok';
        statusLbl.className = 'green-text';
    },
	error: function(data) {
        console.log('error');
        statusLbl.innerText = 'no';
        statusLbl.className = 'red-text';
    }
});

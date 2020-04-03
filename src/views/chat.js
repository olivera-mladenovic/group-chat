var socket = io.connect('http://localhost:3000');
var message = document.getElementById("input"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    id = document.getElementById("id"),
    name = document.getElementById("nameN").innerText;

btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        user: id.innerText,
        name: name
    });
    message.value = "";
});

socket.on('chat', function (data) {
    output.innerHTML += '<p>' + data.name + ': ' + data.message + '</p>';
});

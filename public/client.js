const socket = io();

const form = document.getElementById("send_message");
const messageinput = document.getElementById("messageinput");

const messageConatiner = document.querySelector(".container");

 
const appand = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    messageConatiner.scrollTop = messageConatiner.scrollHeight;
    
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageinput.value;
    appand(`You: ${message}`,'right');
    socket.emit('send', message)
    messageinput.value = '';

})

const na = prompt('ENTER');
socket.emit('new-user-joined', na);

socket.on('user-joined', na => {
    appand(`${na}: joined the chat`, 'left');
    
})
socket.on('receive', data => {
    appand(`${data.na}: ${data.message}`, 'left');

})
socket.on('left', data => {
    appand(`${data} leave the chat`, 'left');

})
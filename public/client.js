const socket = io();

const form = document.getElementById("send_message");
const messageinput = document.getElementById("messageinput");
const mmm = document.getElementById('userr');
const messageConatiner = document.querySelector(".container");

 
const appand = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    messageConatiner.scrollTop = messageConatiner.scrollHeight;
    
}
const aaaa = (mm) => {
     const m = document.createElement('span');
     m.innerText =  str(mm).toUpperCase();
     mmm.append(m);

}

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageinput.value;
    appand(`You: ${message}`,'right');
    socket.emit('send', message)
    messageinput.value = '';

})


const    na = prompt("ENTER YOUR NAME");

socket.emit('new-user-joined', na);
socket.on('show', na => {
    aaaa(`${na}`);
})
socket.on('welcome', na => {
    appand(`Welcome To ChatApp: ${na}`,'left');
})
socket.on('user-joined', na => {
    appand(`${na}: Joined The Chat`, 'left');
    
})
socket.on('receive', data => {
    appand(`${data.na}: ${data.message}`, 'left');

})
socket.on('left', data => {
    appand(`${data} Leave The Chat`, 'left');

})
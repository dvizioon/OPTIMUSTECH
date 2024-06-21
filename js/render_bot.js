let chatOpen = false;

function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    const openChatBtn = document.querySelector('.open-chat-btn');

    chatOpen = !chatOpen;

    if (chatOpen) {
        chatWidget.style.display = 'block';
        openChatBtn.style.display = 'none';
    } else {
        chatWidget.style.display = 'none';
        openChatBtn.style.display = 'block';
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatMessages = document.getElementById('chat-messages');

    // Limpa o campo de entrada após enviar a mensagem
    document.getElementById('user-input').value = '';

    // Cria a mensagem do usuário
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('chat-message', 'user-message');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.textContent = userInput;
    userMessageElement.appendChild(messageBubble);

    // Adiciona mensagem do usuário ao chat
    chatMessages.appendChild(userMessageElement);

    // Simula resposta do chatbot após um pequeno intervalo (aqui você pode implementar a lógica de resposta real)
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('chat-message', 'bot-message');
    const botMessageBubble = document.createElement('div');
    botMessageBubble.classList.add('message-bubble');
    botMessageBubble.textContent = 'Carregando...';
    botMessageElement.appendChild(botMessageBubble);
    chatMessages.appendChild(botMessageElement);

    setTimeout(() => {
        botMessageBubble.textContent = 'Olá! Como posso ajudar?';
    }, 1000);
}

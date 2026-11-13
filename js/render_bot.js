let chatOpen = false;
let chatReady = false;

const replies = [
    {
        keys: ['vaga', 'emprego', 'trabalho', 'oportunidade'],
        text: 'As vagas mais recentes estão na seção "Vagas disponíveis". Use a busca ou os filtros para achar a área que combina com você.'
    },
    {
        keys: ['candidat', 'inscri', 'aplicar'],
        text: 'Para se candidatar, escolha a vaga no site e envie seus dados pelo formulário da oportunidade. Se precisar, escreva para vagasOptimus@optimustech.com.br.'
    },
    {
        keys: ['beneficio', 'benefício', 'salario', 'salário'],
        text: 'A OptimusTech destaca benefícios, cultura e crescimento. Abra a vaga para ver o que cada oportunidade oferece.'
    },
    {
        keys: ['contato', 'email', 'e-mail', 'falar', 'equipe'],
        text: 'Você pode falar com a equipe pelo formulário de contato no rodapé ou pelo e-mail vagasOptimus@optimustech.com.br.'
    },
    {
        keys: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'],
        text: 'Olá! Posso te ajudar a encontrar vagas, explicar como se candidatar ou mostrar como falar com a equipe.'
    }
];

function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    const openChatBtn = document.querySelector('.open-chat-btn');

    chatOpen = !chatOpen;
    chatWidget.classList.toggle('is-open', chatOpen);
    openChatBtn.classList.toggle('is-hidden', chatOpen);

    if (chatOpen) {
        ensureWelcome();
        document.getElementById('user-input').focus();
    }
}

function ensureWelcome() {
    if (chatReady) return;
    chatReady = true;

    appendMessage('bot', 'Olá! Eu sou o assistente da OptimusTech. Posso te orientar sobre vagas, candidatura e contato.');
    appendSuggestions(['Ver vagas', 'Como me candidatar', 'Falar com a equipe']);
}

function appendSuggestions(labels) {
    const chatMessages = document.getElementById('chat-messages');
    const wrap = document.createElement('div');
    wrap.className = 'chat-suggestions';

    labels.forEach((label) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => sendSuggestion(label, wrap));
        wrap.appendChild(button);
    });

    chatMessages.appendChild(wrap);
    scrollChat();
}

function sendSuggestion(text, suggestions) {
    if (suggestions) suggestions.remove();
    document.getElementById('user-input').value = text;
    sendMessage();
}

function sendMessage(event) {
    if (event) event.preventDefault();

    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    document.querySelector('.chat-suggestions')?.remove();
    appendMessage('user', text);

    const typing = appendTyping();

    setTimeout(() => {
        typing.remove();
        appendMessage('bot', replyFor(text));
    }, 700);
}

function replyFor(text) {
    const normalized = text.toLowerCase();
    const match = replies.find((item) => item.keys.some((key) => normalized.includes(key)));
    return match
        ? match.text
        : 'Posso ajudar com vagas, candidatura e contato. Escolha um assunto ou escreva o que você procura.';
}

function appendMessage(role, text) {
    const chatMessages = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.className = `chat-message ${role}-message`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    chatMessages.appendChild(message);
    scrollChat();
}

function appendTyping() {
    const chatMessages = document.getElementById('chat-messages');
    const message = document.createElement('div');
    message.className = 'chat-message bot-message';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    message.appendChild(bubble);
    chatMessages.appendChild(message);
    scrollChat();
    return message;
}

function scrollChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

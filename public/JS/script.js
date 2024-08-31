document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const randomQueryInput = document.getElementById('randomQueryInput');
    const randomQuerySubmit = document.getElementById('randomQuerySubmit');
    const otherQueryContainer = document.getElementById('otherQueryContainer');
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const command = this.getAttribute('data-command');
            if (command === 'other') {
                // Show the input field for the random query
                otherQueryContainer.style.display = 'block';
            } else {
                // Process predefined command
                handleCommand(command);
                otherQueryContainer.style.display = 'none';
                randomQueryInput.value = '';
            }
        });
    });

    randomQuerySubmit.addEventListener('click', () => {
        const randomQuery = randomQueryInput.value.trim();
        if (randomQuery !== '') {
            handleCommand(randomQuery);
            randomQueryInput.value = '';
            otherQueryContainer.style.display = 'none';
        }
    });

    // Function to handle user commands
    function handleCommand(command) {
        // Add user message to the chatbox
        addMessage(command, 'user');

        // Process the command and get bot response
        const botResponse = getBotResponse(command);

        // Add bot response to the chatbox
        setTimeout(() => {
            addMessage(botResponse, 'bot');
        }, 500);
    }

    // Function to add messages to the chatbox
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);

        // Scroll to the bottom of the chatbox
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to get the bot's response based on the command
    function getBotResponse(command) {
        let response;

        switch (command.toLowerCase()) {
            case 'hello':
                response = 'Hi there! How can I assist you today?';
                break;
                case 'help':
                    response = 'You can ask me anything, and I\'ll do my best to help you';
                    break;
            case 'how long will it take to receive my order?':
                response = 'Delivery times vary based on your location and the shipping method selected. You can expect delivery within 2 to 3 business days. You will receive an estimated delivery date upon checkout.';
                break;
            case 'can i cancel or change my order?':
                response = 'Please contact our customer service team as soon as possible if you need to cancel or make changes.';
                break;
            case 'how do i track my order?':
                response = 'You will receive an email with tracking information once your order has shipped. You can use this information to track the status of your order on the shipping carrier\'s website.';
                break;
            case 'what is your return policy?':
                response = 'We accept returns within 7 days of delivery. Please contact our customer service team to initiate the return process. A full refund will be issued once the item is received in its original condition.';
                break;
            default:
                response = `You asked: "${command}". Unfortunately, I don't have a response for that!`;
        }

        return response;
    }
});
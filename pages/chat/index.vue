<template>
  <div class="chat-container">
    <div class="chat-box">
      <!-- Display previous chat history -->
      <div v-for="(message, index) in chatHistory" :key="index" :class="message.isUser ? 'user-message' : 'bot-message'">
        {{ message.text }}
      </div>
    </div>

    <!-- Input box for the user to type a question -->
    <div class="input-box">
      <input
        v-model="userMessage"
        type="text"
        placeholder="Ask a question..."
        @keyup.enter="handleSend"
        :disabled="loading"
      />
      <button @click="handleSend" :disabled="loading || !userMessage">
        {{ loading ? 'Loading...' : 'Send' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userMessage = ref('');  // User's current message input
const chatHistory = ref([]);  // Store the chat history
const loading = ref(false);   // Show loading when waiting for a response

// Function to fetch with timeout
const fetchWithTimeout = (url, options, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

// Retry logic for fetching with retries
const fetchWithRetry = async (url, options, retries = 3) => {
  try {
    return await fetchWithTimeout(url, options, 10000); // 10-second timeout
  } catch (err) {
    if (err.code === 'ECONNRESET') {
      console.error('Connection reset by peer (ECONNRESET). Retrying...');
    } else {
      console.error(`Error occurred: ${err.message}`);
    }

    if (retries > 0) {
      console.log(`Retrying... (${3 - retries} remaining)`);
      return fetchWithRetry(url, options, retries - 1);
    } else {
      throw new Error('Maximum retries reached');
    }
  }
};

// Handle sending the user's message and fetching the response
const handleSend = async () => {
  if (!userMessage.value) return;

  // Add the user's message to the chat history
  chatHistory.value.push({ text: userMessage.value, isUser: true });

  // Reset input field
  const query = userMessage.value;
  userMessage.value = '';

  // Start loading and fetch the response from the API
  loading.value = true;

  try {
    const response = await fetchWithRetry('/api/blog/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let botMessage = ''; // Initialize the bot's message

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Parse the chunk into JSON
      const jsonChunk = JSON.parse(chunk.replace(/^data: /, '').trim());

      // Extract the content of the response chunk
      const content = jsonChunk.choices[0].delta?.content || '';

      // Concatenate content to form the full bot response
      botMessage += content;

      // Update the chat history in real-time
      chatHistory.value = chatHistory.value.map((msg, idx, arr) => {
        if (idx === arr.length - 1 && !msg.isUser) {
          return { text: botMessage, isUser: false }; // Update last bot message
        }
        return msg;
      });
    }

    // Add the bot's final response to the chat history
    chatHistory.value.push({ text: botMessage, isUser: false });
  } catch (error) {
    console.error('Error fetching stream:', error);
    chatHistory.value.push({ text: 'Error fetching response', isUser: false });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.chat-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.user-message {
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 5px;
  text-align: right;
  margin-bottom: 10px;
}

.bot-message {
  background-color: #f4f4f4;
  padding: 8px;
  border-radius: 5px;
  text-align: left;
  margin-bottom: 10px;
}

.input-box {
  display: flex;
  gap: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

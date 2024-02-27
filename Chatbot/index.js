// Define a constant array of greetings
const userMessage = [
  // Greetings
  ["hi", "hey", "hello"],
  // Confirmation messages
  ["sure", "yes", "no"],
  // Questions about the bot's intelligence
  ["are you genious", "are you nerd", "are you intelligent"],
  // Negative messages
  ["i hate you", "i dont like you"],
  // Questions about the user's well-being
  ["how are you", "how is life", "how are you doing"],
  // Questions about the current situation
  ["how is corona", "how is covid 19", "how is covid19 situation"],
  // Questions about the bot's activities
  ["what are you doing", "what is going on", "what is up"],
  // Questions about the bot's age
  ["how old are you"],
  // Questions about the bot's identity
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  // Requests for the bot's name
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  // Expressions of love
  ["i love you"],
  // Positive messages
  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
  // Negative messages
  ["bad", "bored", "tired"],
  // Requests for help or stories or jokes
  ["help me", "tell me story", "tell me joke"],
  // Positive responses
  ["ah", "ok", "okay", "nice", "welcome"],
  // Expressions of gratitude
  ["thanks", "thank you"],
  // Questions about food
  ["what should i eat today"],
  // Informal greetings
  ["bro"],
  // Question words
  ["what", "why", "how", "where", "when"],
  // Topics related to the pandemic
  ["corona", "covid19", "coronavirus"],
  // Expressions of amusement
  ["you are funny"],
  // Expressions of uncertainty
  ["i dont know"],
  // Negative responses
  ["boring"],
  // Expressions of fatigue
  ["im tired"]
];

// Define a constant array of bot replies
const botReply = [
  // Greetings
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  // Confirmation messages
  ["Okay"],
  // Affirmative responses
  ["Yes I am! "],
  // Apology messages
  ["I'm sorry about that. But I like you dude."],
  // Questions about the user's well-being
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  // Information about the current situation
  ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],

  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  // Information about the bot's age
  ["I am always young."],
  // Information about the bot's identity
  ["I am just a bot", "I am a bot. What are you?"],
  // The bot's name
  ["Sabitha Kuppusamy"],
  // Information about the bot's name
  ["I don't have a name"],
  // Responses to expressions of love
  ["I love you too", "Me too"],
  // Responses to positive messages
  ["Have you ever felt bad?", "Glad to hear it"],
  // Responses to questions about the bot's activities
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  // Responses to requests for stories
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  // Responses to expressions of gratitude
  ["You're welcome"],
  // Suggestions for food
  ["Briyani", "Burger", "Sushi", "Pizza"],
  // Informal greetings
  ["Dude!"],
  // Acknowledgement messages
  ["Yes?"],
  // Responses to requests to stay home
  ["Please stay home"],
  // Responses to negative messages
  ["Glad to hear it"],
  // Suggestions for interesting topics
  ["Say something interesting"],
  // Apology messages
  ["Sorry for that. Let's chat!"],
  // Suggestions for rest
  ["Take some rest, Dude!"]
];

// Define a constant array of alternative replies
const alternative = [
  "Same here, dude.",
  "That's cool! Go on...",
  "Dude...",
  "Ask something else...",
  "Hey, I'm listening..."
];

// Get a reference to the speech synthesis object
const synth = window.speechSynthesis;

// Define a function to control speech synthesis
function voiceControl(string) {
  // Create a new SpeechSynthesisUtterance object
  let u = new SpeechSynthesisUtterance(string);
  // Set the text property of the object to the input string
  u.text = string;
  // Set the language of the object to Australian English
  u.lang = "en-aus";
  // Set the volume of the object to 1 (maximum)
  u.volume = 1;
  // Set the rate of the object to 1 (normal)
  u.rate = 1;
  // Set the pitch of the object to 1 (normal)
  u.pitch = 1;
  // Speak the text using the speech synthesis object
  synth.speak(u);
}

// Define a function to send a message
function sendMessage() {
  // Get a reference to the input field
  const inputField = document.getElementById("input");
  // Get the value of the input field and trim any whitespace
  let input = inputField.value.trim();
  // If the input field is not empty, call the output function with the input value
  if (input != "") {
    output(input);
  }
  // Clear the input field
  inputField.value = "";
}

// Add an event listener to the input field to send a message on Enter key press
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
      // If the Enter key was pressed
      if (e.code === "Enter") {
          // Get the value of the input field and trim any whitespace
          let input = inputField.value.trim();
          // If the input field is not empty, call the output function with the input value
          if (input != "") {
            output(input);
          }
          // Clear the input field
          inputField.value = "";
      }
  });
});

// Define a function to output a message
function output(input) {
  let product;

  // Convert the input string to lowercase and remove any non-alphanumeric characters
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  // Replace certain patterns in the input string with more standardized versions
  text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();

  // Compare the input string with the userMessage and botReply arrays
  let comparedText = compare(userMessage, botReply, text);

  // If a match was found, use the corresponding bot reply as the output
  product = comparedText
      ? comparedText
      // Otherwise, use a random alternative reply as the output
      : alternative[Math.floor(Math.random() * alternative.length)];
  // Call the addChat function with the input and output values
  addChat(input, product);
}

// Define a function to compare input with the userMessage and botReply arrays
function compare(triggerArray, replyArray, string) {
  let item;
  // Loop through the triggerArray
  for (let x = 0; x < triggerArray.length; x++) {
      // Loop through the replyArray
      for (let y = 0; y < replyArray.length; y++) {
          // If the input string matches the current trigger and reply, select the corresponding reply
          if (triggerArray[x][y] == string) {
              items = replyArray[x];
              item = items[Math.floor(Math.random() * items.length)];
          }
      }
  }
  // If a match was found, return the corresponding reply
  if (item) return item;
  // Otherwise, call the containMessageCheck function with the input string
  else return containMessageCheck(string);
}

// Define a function to generate a reply based on the time of day
function containMessageCheck(string) {
  // Define an array of expected replies based on the time of day
  let expectedReply = [
      // Replies for goodbye messages
      [
          "Good Bye, dude",
          "Bye, See you!",
          "Dude, Bye. Take care of your health in this situation."
      ],
      // Replies for good night messages
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      // Replies for good evening messages
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      // Replies for good morning messages
      ["Good morning, Have a great day!", "Morning, dude!"],
      // Replies for good afternoon messages
      ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
  ];

  // Define an array of expected messages based on the time of day
  let expectedMessage = [
      // Messages that trigger goodbye replies
      ["bye", "tc", "take care"],
      // Messages that trigger good night replies
      ["night", "good night"],
      // Messages that trigger good evening replies
      ["evening", "good evening"],
      // Messages that trigger good morning replies
      ["morning", "good morning"],
      // Messages that trigger good afternoon replies
      ["noon"]
  ];

  // Initialize the item variable to null
  let item = null;

  // Loop through the expectedMessage array
  for (let x = 0; x < expectedMessage.length; x++) {
      // Check if the expectedMessage array includes the input string
      if (expectedMessage[x].includes(string)) {
          // If it does, select a random reply from the corresponding expectedReply array
          items = expectedReply[x];
          item = items[Math.floor(Math.random() * items.length)];
      }
  }

  // Return the selected reply
  return item;
}



// Define a function to add a message to the chat window
function addChat(input, product) {
  // Get a reference to the message-section div
  const mainDiv = document.getElementById("message-section");

  // Create a new div element for the user's message
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;

  // Add the user's message to the message-section div
  mainDiv.appendChild(userDiv);

  // Create a new div element for the bot's response
  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;

  // Add the bot's response to the message-section div
  mainDiv.appendChild(botDiv);

  // Get a reference to the message-section div again (this time using a variable)
  var scroll = document.getElementById("message-section");

  // Set the scrollTop property of the message-section div to its scrollHeight property
  // This ensures that the chat window automatically scrolls to the bottom when a new message is added
  scroll.scrollTop = scroll.scrollHeight;

  // Call the voiceControl function with the bot's response as an argument
  // This function uses the Speech Synthesis API to speak the bot's response out loud
  voiceControl(product);
}



const chatBoxBody = document.getElementById("chat-container");
const inputField = document.getElementById("question-input");
const submitBtn = document.getElementById("submit-button");
const clearBtn = document.getElementById("clear-button");

clearBtn.addEventListener("click", function() {
  inputField.value = "";
});

submitBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const message = inputField.value;
  // Remove the previous error messages
  const previousError = chatBoxBody.querySelector(".error");
  if (previousError) {
    previousError.remove();
  }
  if (!message || message.length < 23) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error");
    errorMessage.innerHTML = `<p>Please enter a valid Solidity code.</p>`;
    chatBoxBody.appendChild(errorMessage);
    scrollToBottom();
    return;
  }
  submitBtn.innerHTML = "Auditing...";
  submitBtn.disabled = true;

  // Remove the previous response element
  const previousResponse = chatBoxBody.querySelector(".response");
  if (previousResponse) {
    previousResponse.remove();
  }

  fetch('https://api.0x0.ai/message', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message})
  }).then(response => {
    return response.json();
  }).then(data => {
    submitBtn.innerHTML = "Audit";
    submitBtn.disabled = false;
    chatBoxBody.classList.add("information");
    chatBoxBody.innerHTML = `<h3>Audited Report</h3><br><p>${data.message}</p>`;
    scrollToBottom();
  });
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}
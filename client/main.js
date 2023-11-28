console.log("-- Hello World --");

// query selectors
const form = document.querySelector("form");
const chatContainerTEST = document.querySelector(".chat_containerTEST");
const chatContainer = document.querySelector(".chat_container");
const test = document.querySelector("#test");

// Helper functions

const handleTESTSubmit = async (e) => {
  e.preventDefault();
  console.log("TEST");
  // TEST fetch data from server
  const responseTEST = await fetch("http://localhost:5000/TEST", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (responseTEST.ok) {
    // save the response in data variable
    const dataTEST = await responseTEST.json();

    // display the message on DOM
    chatContainerTEST.innerHTML += dataTEST.message;
  } else {
    const err = await response.text();
    // messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit");

  const data = new FormData(form);

  form.reset();

  // fetch data from server
  const response = await fetch("http://localhost:5000/API", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    // save the response in data variable
    const data = await response.json();
    console.log(data);

    // parse the data to get the text
    const parsedData = data.bot.content;

    // display the message on DOM
    chatContainer.innerHTML += data.message;
  } else {
    const err = await response.text();
    // messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

// event listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});

// TEST event listener
test.addEventListener("click", handleTESTSubmit);

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

/**
 * OpenAI API
 * @see https://beta.openai.com/docs/api-reference/introduction
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

// Create a new express application instance
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// TEST: GET request to make sure the server is running
app.get("/TEST", async (req, res) => {
  res.status(200).send({
    message: "✅The Server is running",
  });
});

// Descript to the API the type of response you want from the bot
const typeOfResponse = "Make it funny with emojis";

// This is the POST request that will be used to send the prompt to the OpenAi API
app.post("/API", async (req, res) => {
  try {
    // Get the prompt from the request body
    const prompt = req.body.prompt;

    // Send the prompt to the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          // Example: `${"In a list of 5 book recommandations, give me the author: "}, ${" Jk Rowling "}
          content: `${typeOfResponse}, ${prompt}`,
        },
      ],

      // How long the response will be: 150, 200, 250, 300, 350, 400, 450, 500, 550, 600
      max_tokens: 450,
    });

    // Send the response back to the client
    res.status(200).send({
      bot: response.choices[0].message,
    });
  } catch (error) {
    // Catch any errors and send them back to the client
    console.log(error);
    res.status(500).send({ error });
  }
});

// Listening on port 5000
app.listen(5000, () =>
  console.log(`✅Server is running on port http://localhost:5000`)
);

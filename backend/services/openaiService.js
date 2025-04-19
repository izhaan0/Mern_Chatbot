const OpenAI = require("openai"); // ✅ Correct import
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const openai = new OpenAI({ // ✅ Correct usage
  apiKey: process.env.API_KEY,
});

async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [];

    if (systemContent) {
      messages.push({ role: "system", content: systemContent });
    }

    if (previousChat) {
      messages.push({ role: "assistant", content: previousChat });
    }

    messages.push({ role: "user", content: promptContent });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-4
      // model: "gpt-3.5-turbo-1106",
      messages,
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    return `An error occurred while processing the request: ${error.message}`;
  }
}


module.exports = { callGPT };

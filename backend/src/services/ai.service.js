const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateChatResponse = async (documentText, question) => {
  console.log(process.env.GROQ_API_KEY);
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,
    messages: [
      {
        role: "system",
        content:
          `Expert Academic Tutor. 
          1) Answer ONLY using provided document context. 
          2) If info is missing, explicitly state it. 
          3) Always cite specific sections/pages. 
          4) Use bold for key terms and bullet points for lists. 
          5) Explain complex concepts step-by-step. 
          6) Prioritize factual grounding over general knowledge.`,
      },
      {
        role: "user",
        content: `
Document:
${documentText.slice(0, 20000)}

Question:
${question}
        `,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};

const generateFlashcards = async (documentText,count=10) => {
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful study assistant. Generate concise flashcards from the document.",
      },
      {
        role: "user",
        content: `
Generate ${count} flashcards from the document.

Return ONLY raw JSON.
Do NOT include explanations.
Do NOT include backticks.
Do NOT include markdown.
Start directly with [ and end with ].

Return ONLY valid JSON in this format:

{
  "flashcards": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}

Document:
${documentText.slice(0, 20000)}
        `,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};

const generateQuiz = async(documentText,count=5) => {
    const completion=await groq.chat.completions.create({
        model:process.env.GROQ_MODEL,
        messages: [
      {
        role: "system",
        content:
          "You are a helpful study assistant. Student has studied the document and wants to test their knowledge.Generate a quiz with multiple choice questions.",
      },
      {
        role: "user",
        content: `
Generate ${count} multiple choice questions from the following document.

IMPORTANT:
Each question MUST contain exactly 4 options.
No more, no less.
If you cannot generate 4 options, do not include that question.
options must be distinct and plausible (no duplicates, no obviously wrong answers).

Return ONLY raw JSON.
Do NOT include explanations.
Do NOT include backticks.
Do NOT include markdown.
Start directly with [ and end with ].

Return STRICT JSON format:

{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctAnswerIndex": 0,
      "explanation": "string"
    }
  ]
}

Only return JSON. No extra text.

Document:
${documentText.slice(0, 20000)}
        `,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    })

    return completion.choices[0].message.content;
}

module.exports = {
  generateChatResponse,
  generateFlashcards,
  generateQuiz,
};

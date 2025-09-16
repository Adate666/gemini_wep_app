import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getReviewPrompt = (language: string, code: string): string => {
  return `
As an expert senior software engineer and code reviewer, please provide a thorough review of the following ${language} code.

Analyze the code for the following aspects:
1.  **Correctness & Bugs:** Identify any potential bugs, logic errors, or edge cases that are not handled.
2.  **Best Practices & Readability:** Suggest improvements based on established best practices for ${language}. Comment on code style, clarity, naming conventions, and overall readability.
3.  **Performance:** Point out any potential performance bottlenecks and suggest optimizations.
4.  **Security:** Highlight any potential security vulnerabilities.
5.  **Maintainability & Scalability:** Comment on the code's structure, modularity, and how easy it would be to maintain or scale in the future.

Provide your feedback in well-structured Markdown format. Use headings for each section (e.g., "### Correctness & Bugs"). Use bullet points for individual suggestions. When suggesting code changes, use Markdown code blocks with the appropriate language identifier. Be constructive and explain the "why" behind your suggestions.

Here is the code to review:
\`\`\`${language}
${code}
\`\`\`
`;
};

export const reviewCode = async (
  code: string,
  language: string
): Promise<string> => {
  try {
    const prompt = getReviewPrompt(language, code);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error reviewing code:", error);
    if (error instanceof Error) {
      return Promise.reject(
        new Error(`Failed to get review from Gemini API: ${error.message}`)
      );
    }
    return Promise.reject(
      new Error(
        "An unexpected error occurred while communicating with the Gemini API."
      )
    );
  }
};

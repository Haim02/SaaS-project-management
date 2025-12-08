import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY in environment");
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type TaskForSummary = {
    title: string;
    status: string;
    priority?: string;
    assigneeName?: string | null;
};


export const summarizeProject = async (projectName: string, tasks: TaskForSummary[]): Promise<string> => {
    const tasksText =
        tasks.length === 0
            ? "אין משימות בפרויקט."
            : tasks
                .map((task, index) => {
                    const parts = [
                        `${index + 1}. ${task.title}`,
                        `סטטוס: ${task.status}`,
                    ];
                    if (task.priority) parts.push(`עדיפות: ${task.priority}`);
                    if (task.assigneeName) parts.push(`אחראי: ${task.assigneeName}`);
                    return parts.join(" | ");
                })
                .join("\n");

    const prompt = `
אתה מסייע בניתוח מצב של פרויקט תוכנה במערכת לניהול פרויקטים.

שם הפרויקט: ${projectName}

להלן רשימת המשימות:
${tasksText}

אנא כתוב סיכום קצר בעברית שכולל:
1. תמונת מצב כללית של הפרויקט.
2. אילו משימות נראות דחופות או תקועות.
3. המלצה על מה כדאי לצוות להתמקד בשבוע הקרוב.

כתוב בעברית ברורה, 2–3 פסקאות קצרות.
`;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: "אתה עוזר ניתוח פרויקטים בעברית." },
                { role: "user", content: prompt },
            ],
            temperature: 0.4,
        });

        const content = response.choices[0]?.message?.content;
        return content ?? "לא הצלחתי להפיק סיכום כרגע.";
    } catch (err: any) {
        console.error("OpenAI error:", err);

        // טיפול מיוחד ב-Rate Limit
        if (err?.status === 429) {
            return "המערכת החכמה כרגע לא זמינה (חריגה ממכסה ה-AI). נסה שוב מאוחר יותר.";
        }

        // לכל שגיאה אחרת
        return "אירעה שגיאה בעת הפקת סיכום הפרויקט.";
    }
}


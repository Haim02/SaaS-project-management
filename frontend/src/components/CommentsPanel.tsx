import { useState } from "react";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "../services/tasksApi";
import Spinner from "./Spinner";

type CommentsPanelProps = {
  taskId: string;
};

const CommentsPanel = ({ taskId }: CommentsPanelProps) => {
  const { data, isLoading, isError } = useGetCommentsQuery({ taskId });
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [text, setText] = useState("");

  if (isLoading) {
    return <div className="text-sm text-gray-500"><Spinner /></div>;
  }
  if (isError) {
    return <div className="text-sm text-red-600">שגיאה בטעינת תגובות</div>;
  }

  async function submit() {
    if (!text.trim()) return;
    await addComment({ taskId, text }).unwrap();
    setText("");
  }

  return (
    <div className="border-t pt-3 mt-4">
      <h4 className="font-semibold mb-2">תגובות</h4>

      <div className="space-y-3 max-h-48 overflow-auto">
        {data?.map((c) => (
          <div key={c._id} className="bg-gray-50 border rounded-lg p-2">
            <div className="text-xs text-gray-500">
              {c.author} • {new Date(c.createdAt).toLocaleString("he-IL")}
            </div>
            <div className="text-sm mt-1">{c.text}</div>
            <button
              onClick={() => deleteComment({ taskId, commentId: c._id })}
              className="text-xs text-red-600 hover:underline mt-1"
            >
              מחק
            </button>
          </div>
        ))}
        {(!data || data.length === 0) && (
          <div className="text-xs text-gray-500">אין תגובות עדיין.</div>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="הוסף תגובה…"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={submit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          שלח
        </button>
      </div>
    </div>
  );
}

export default CommentsPanel;


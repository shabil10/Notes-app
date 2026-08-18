import { useState } from "react";
import ColorPicker from "./ColorPicker";

function NotesForm({
  onSave,
  editingNote,
  onCancel,
}) {
  const [title, setTitle] = useState(
    editingNote?.title || ""
  );

  const [content, setContent] = useState(
    editingNote?.content || ""
  );

  const [tags, setTags] = useState(
    editingNote?.tags?.join(", ") || ""
  );

  const [color, setColor] = useState(
    editingNote?.color || "yellow"
  );

  const [error, setError] = useState("");

  function resetForm() {
    setTitle("");
    setContent("");
    setTags("");
    setColor("yellow");
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    if (title.length > 100) {
      setError("Title cannot exceed 100 characters.");
      return;
    }

    if (content.length > 5000) {
      setError("Content cannot exceed 5000 characters.");
      return;
    }

    if (tags.length > 200) {
      setError("Tags cannot exceed 200 characters.");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      content: content.trim(),
      tags: tagArray,
      color,
    });

    if (!editingNote) {
      resetForm();
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-lg">

      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-blue-600 text-xs uppercase tracking-wider font-semibold">
            {editingNote ? "Editing" : "Create"}
          </p>

          <h3 className="text-xl font-semibold mt-1 text-gray-900">
            {editingNote
              ? "Update your note"
              : "Create a new note"}
          </h3>
        </div>

        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Cancel
          </button>
        )}

      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Note title..."
          value={title}
          maxLength={100}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <div className="text-right text-xs text-gray-500 mt-1 mb-4">
          {title.length}/100
        </div>

        <textarea
          placeholder="Start writing your thoughts..."
          value={content}
          maxLength={5000}
          onChange={(e) => {
            setContent(e.target.value);
            setError("");
          }}
          rows="6"
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <div className="text-right text-xs text-gray-500 mt-1 mb-4">
          {content.length}/5000
        </div>

        <input
          type="text"
          placeholder="Add tags... (e.g., work, idea, important)"
          value={tags}
          maxLength={200}
          onChange={(e) => setTags(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-5"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <ColorPicker
            color={color}
            setColor={setColor}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            {editingNote
              ? "Update Note"
              : "Create Note"}
          </button>

        </div>

        {error && (
          <p className="text-red-400 text-sm mt-4">
            {error}
          </p>
        )}

      </form>
    </div>
  );
}

export default NotesForm;
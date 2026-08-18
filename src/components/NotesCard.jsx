function NotesCard({
  note,
  onEdit,
  onDelete,
  onArchive,
  onPin,
}) {
  const colors = {
    yellow: "from-amber-500/20 to-yellow-500/5 border-amber-500/20",
    blue: "from-blue-500/20 to-cyan-500/5 border-blue-500/20",
    green: "from-emerald-500/20 to-green-500/5 border-emerald-500/20",
    pink: "from-pink-500/20 to-rose-500/5 border-pink-500/20",
    purple: "from-purple-500/20 to-violet-500/5 border-purple-500/20",
    orange: "from-orange-500/20 to-amber-500/5 border-orange-500/20",
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${
        colors[note.color]
      } bg-white border rounded-2xl p-5 min-h-[260px] flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >

      <div className="flex justify-between items-start">

        <div className="flex gap-2">

          {note.pinned && (
            <span className="text-sm">
              📌
            </span>
          )}

          {note.archived && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              Archived
            </span>
          )}

        </div>

        <button
          type="button"
          onClick={() => onPin(note.id)}
          className="text-gray-600 hover:text-blue-600 transition"
        >
          {note.pinned ? "★" : "☆"}
        </button>

      </div>

      <h3 className="text-lg font-semibold mt-4 break-words text-gray-900">
        {note.title || "Untitled Note"}
      </h3>

      <p className="text-gray-600 text-sm mt-3 whitespace-pre-wrap break-words line-clamp-5">
        {note.content}
      </p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">

          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}

        </div>
      )}

      <div className="mt-auto pt-5">

        <p className="text-xs text-gray-500 mb-4">
          {note.updatedAt
            ? `Updated ${note.updatedAt}`
            : `Created ${note.createdAt}`}
        </p>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => onEdit(note)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm transition"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onArchive(note.id)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm transition"
          >
            {note.archived ? "↩" : "□"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg text-sm transition"
          >
            ×
          </button>

        </div>

      </div>

    </div>
  );
}

export default NotesCard;
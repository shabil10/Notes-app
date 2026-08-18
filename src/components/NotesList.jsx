import { useState } from "react";
import NotesCard from "./NotesCard";

function NotesList({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onPin,
  onBulkDelete,
}) {
  const [selected, setSelected] = useState([]);

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function handleBulkDelete() {
    onBulkDelete(selected);
    setSelected([]);
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">
          📝
        </div>

        <h2 className="text-2xl font-semibold text-gray-700">
          No notes found
        </h2>

        <p className="text-gray-500 mt-2">
          Create a new note or change your search/filter.
        </p>
      </div>
    );
  }

  return (
    <div>
      {selected.length > 0 && (
        <div className="mb-5 bg-white p-4 rounded-lg shadow flex justify-between items-center border border-gray-200">
          <p className="text-gray-900">
            {selected.length} notes selected
          </p>

          <button
            type="button"
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative"
          >
            <input
              type="checkbox"
              checked={selected.includes(note.id)}
              onChange={() =>
                toggleSelect(note.id)
              }
              className="absolute top-3 left-3 z-10 w-4 h-4"
            />

            <NotesCard
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchive={onArchive}
              onPin={onPin}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
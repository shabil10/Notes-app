import { useEffect, useMemo, useState } from "react";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function saveNote(noteData) {
    const duplicate = notes.some(
      (note) =>
        note.id !== editingNote?.id &&
        note.title.trim().toLowerCase() ===
          noteData.title.trim().toLowerCase() &&
        note.content.trim().toLowerCase() ===
          noteData.content.trim().toLowerCase()
    );

    if (duplicate) {
      alert("A note with the same title and content already exists.");
      return;
    }

    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...noteData,
                updatedAt: new Date().toLocaleString(),
              }
            : note
        )
      );

      setEditingNote(null);
      setShowForm(false);
      return;
    }

    const newNote = {
      ...noteData,
      id: Date.now().toString(),
      pinned: false,
      archived: false,
      createdAt: new Date().toLocaleString(),
      updatedAt: "",
    };

    setNotes((prev) => [newNote, ...prev]);
  }

  function deleteNote(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    setNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  }

  function toggleArchive(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      )
    );
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note
      )
    );
  }

  function deleteSelected(ids) {
    if (ids.length === 0) return;

    const confirmDelete = window.confirm(
      `Delete ${ids.length} selected notes?`
    );

    if (!confirmDelete) return;

    setNotes((prev) =>
      prev.filter((note) => !ids.includes(note.id))
    );
  }

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText) ||
          note.content.toLowerCase().includes(searchText) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchText)
          )
      );
    }

    if (filter === "active") {
      result = result.filter(
        (note) => !note.archived
      );
    }

    if (filter === "archived") {
      result = result.filter(
        (note) => note.archived
      );
    }

    if (filter === "pinned") {
      result = result.filter(
        (note) => note.pinned
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) => Number(a.id) - Number(b.id)
      );
    }

    if (sort === "title") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "color") {
      result.sort((a, b) =>
        a.color.localeCompare(b.color)
      );
    }

    result.sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });

    return result;
  }, [notes, search, filter, sort]);

  const activeNotes = notes.filter(
    (note) => !note.archived
  ).length;

  const archivedNotes = notes.filter(
    (note) => note.archived
  ).length;

  const pinnedNotes = notes.filter(
    (note) => note.pinned
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">

      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col p-6 fixed h-screen">

        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg">
            ✦
          </div>

          <div>
            <h1 className="font-bold text-lg">
              NoteSpace
            </h1>

            <p className="text-xs text-slate-500">
              Your second brain
            </p>
          </div>
        </div>

        <nav className="space-y-2">

          <button
            onClick={() => setFilter("all")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>◈</span>
            All Notes
            <span className="ml-auto text-xs">
              {notes.length}
            </span>
          </button>

          <button
            onClick={() => setFilter("pinned")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
              filter === "pinned"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>✦</span>
            Pinned
            <span className="ml-auto text-xs">
              {pinnedNotes}
            </span>
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
              filter === "active"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>✓</span>
            Active
            <span className="ml-auto text-xs">
              {activeNotes}
            </span>
          </button>

          <button
            onClick={() => setFilter("archived")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
              filter === "archived"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>▣</span>
            Archive
            <span className="ml-auto text-xs">
              {archivedNotes}
            </span>
          </button>

        </nav>

        <div className="mt-auto bg-gray-100 rounded-2xl p-4">
          <p className="text-sm font-medium text-gray-900">
            Your notes
          </p>

          <p className="text-xs text-gray-600 mt-1">
            Everything is saved automatically.
          </p>

          <div className="mt-4 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>

      </aside>

      <main className="flex-1 lg:ml-64">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>
              <p className="text-blue-600 text-sm font-medium mb-1">
                Welcome back 👋
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Your Notes
              </h2>

              <p className="text-gray-600 mt-2">
                Capture your thoughts and ideas.
              </p>
            </div>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingNote(null);
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-5 py-3 rounded-xl font-medium shadow-lg shadow-blue-200/50 transition text-white"
            >
              {showForm ? "✕ Cancel" : "+ New Note"}
            </button>

          </div>

          {(showForm || editingNote) && (
            <NotesForm
              key={editingNote?.id || "new"}
              onSave={saveNote}
              editingNote={editingNote}
              onCancel={() => {
                setEditingNote(null);
                setShowForm(false);
              }}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-gray-600 text-sm">
                Total Notes
              </p>

              <p className="text-3xl font-bold mt-2 text-gray-900">
                {notes.length}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-gray-600 text-sm">
                Pinned
              </p>

              <p className="text-3xl font-bold mt-2 text-gray-900">
                {pinnedNotes}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-gray-600 text-sm">
                Archived
              </p>

              <p className="text-3xl font-bold mt-2 text-gray-900">
                {archivedNotes}
              </p>
            </div>

          </div>

          <SearchFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />

          <NotesList
            notes={filteredNotes}
            onEdit={setEditingNote}
            onDelete={deleteNote}
            onArchive={toggleArchive}
            onPin={togglePin}
            onBulkDelete={deleteSelected}
          />

        </div>

      </main>

    </div>
  );
}

export default App;
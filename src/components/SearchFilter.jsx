function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 shadow-sm">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">
            All Notes
          </option>

          <option value="active">
            Active Notes
          </option>

          <option value="archived">
            Archived
          </option>

          <option value="pinned">
            Pinned
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="title">
            Title
          </option>

          <option value="color">
            Color
          </option>
        </select>

      </div>

    </div>
  );
}

export default SearchFilter;
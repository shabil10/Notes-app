function ColorPicker({ color, setColor }) {
  const colors = [
    {
      name: "yellow",
      className: "bg-yellow-400",
    },
    {
      name: "blue",
      className: "bg-blue-400",
    },
    {
      name: "green",
      className: "bg-emerald-400",
    },
    {
      name: "pink",
      className: "bg-pink-400",
    },
    {
      name: "purple",
      className: "bg-purple-400",
    },
    {
      name: "orange",
      className: "bg-orange-400",
    },
  ];

  return (
    <div>
      <p className="text-xs text-gray-600 mb-2">
        Note color
      </p>

      <div className="flex gap-3">

        {colors.map((item) => (
          <button
            type="button"
            key={item.name}
            onClick={() => setColor(item.name)}
            className={`w-7 h-7 rounded-full ${
              item.className
            } ${
              color === item.name
                ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white"
                : ""
            }`}
          />
        ))}

      </div>
    </div>
  );
}

export default ColorPicker;
export const Select = ({ options = [], ...props }) => {
    return (
      <select {...props} className="border p-2 rounded w-full">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  
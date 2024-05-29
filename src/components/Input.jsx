import { useState } from "react";

function Input({ type, placeholder, name, value, handleChange }) {
  // STATES AND VARIABLES
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div className="bg-white flex flex-col items-start justify-center p-1 border-gray-200 border-2 w-full rounded-sm">
        <input
          className="focus:outline-none px-2 w-full"
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          value={value}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required
        />
      </div>
    </>
  );
}

export default Input;

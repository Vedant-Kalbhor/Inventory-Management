import React from 'react';

export default function Input({ label, name, register, required = false, type = 'text', ...rest }) {
  return (
    <label className="block mb-2">
      <div className="text-sm mb-1">{label}</div>
      <input
        {...(register ? register(name, { required }) : {})}
        type={type}
        name={name}
        className="w-full border rounded px-2 py-1"
        {...rest}
      />
    </label>
  );
}

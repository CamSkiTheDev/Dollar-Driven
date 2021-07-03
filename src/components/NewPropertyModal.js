import { useState } from "react";

export default function NewPropertyModal() {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-black absolute top-0 left-0 z-50 bg-opacity-70">
      <form className="flex flex-col w-full m-4 max-w-xl bg-white rounded-md p-4">
        <h3>New Property</h3>
        <p>Add a new property just fill out the street address and press add</p>
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Street Address"
          required
        />
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated Value (Optional)"
          required
        />
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated ARV (Optional)"
          required
        />
        <input
          type="text"
          className="rounded w-full my-1"
          placeholder="Estimated Monthly Rent (Optional)"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-16 py-2 mt-4 ml-auto rounded-md max-w-xs"
        >
          Add
        </button>
      </form>
    </div>
  );
}

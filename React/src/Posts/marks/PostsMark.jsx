import React from "react";
import { useEffect, useState, useReducer } from "react";
import { PostMark } from "./PostMark";
import { postMarkReducer } from "./postMarkReducer";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("marks")) || [];
};

export const PostsMarks = () => {
  const [marks, dispatchMarks] = useReducer(postMarkReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const handleDeleteMark = (id) => {
    console.log("Aqui arribo " + id);
    dispatchMarks({
      type: "Del Mark",
      payload: id
    });
  };

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div>
            {marks.map((mark) => (
              <PostMark
                key={mark.id}
                mark={mark}
                handleDeleteMark={handleDeleteMark}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
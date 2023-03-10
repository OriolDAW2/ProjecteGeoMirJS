import React from "react";
import { useEffect } from "react";
import { PostMark } from "./PostMark";
import { useDispatch, useSelector } from "react-redux";

// import { postMarkReducer } from "./postMarkReducer";

export const PostsMarks = () => {

  const { marks } = useSelector(state => state.marks)
  const dispatch = useDispatch(); 

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  // const handleDeleteMark = (id) => {
  //   console.log("Aqui arribo " + id);
  //   dispatchMarks({
  //     type: "Del Mark",
  //     payload: id
  //   });
  // };

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div>
            {marks.map((mark) => (
              <PostMark
                key={mark.id}
                mark={mark}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
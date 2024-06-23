import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Taskitem = ({ id, text, checked, handleDelete }) => {
  const [done, setDone] = useState(checked);

  const handleSetDone = (event) => {
    setDone(!done);
  };
  return (
        <div className="border-2 border-blue-500 bg-black">
          <input
            className="text-lg w-7 h-7 absolute"
            id={id}
            type="checkbox"
            onClick={handleSetDone}
          />
          <span className="text-white text-lg font-thin mt-5 ml-10">{text}</span>
          <button
          className='rounded-3xl bg-blue-500 ml-5 w-10 mb-3'
          data-deleteid={id}
          onClick={handleDelete}
        >X</button>
        </div>
  );
};

export default Taskitem;

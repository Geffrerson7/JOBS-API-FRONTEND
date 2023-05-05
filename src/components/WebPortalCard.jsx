import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const WebPortalCard = ({ webPortal }) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex gap-4 drop-shadow-lg mt-2">
      {/* Icon */}
      <div className="w-[10%] flex items-center justify-center">
        <img src={webPortal.logo} alt="portal-logo" className="rounded-md" />
      </div>
      {/* Tema */}
      <div className="w-[40%]">
        <h3 className="text-lg flex items-center gap-4 mb-2">
          {webPortal.name}{" "}
          <span className="text-xs px-1 py-2 bg-green-100 text-green-600 font-bold rounded-md">
            <a href={webPortal.url}>Link</a>
          </span>
        </h3>
        <p className="text-gray-500 text-xs">{webPortal.prefixe}</p>
      </div>
      <div className="w-[40%] text-justify">
        <p className="text-blue-800 text-xs">
          {webPortal.description}
        </p>
      </div>
      <div className="w-[10%] flex flex-col">
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-md mb-2 text-xs flex flex-row items-center">
          <AiFillEdit className="mr-2" />
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md text-xs flex flex-row items-center">
          <MdDelete className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default WebPortalCard;

import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DeleteJob from "../services/DeleteJob";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-6 flex gap-4 drop-shadow-lg mt-2">
      {/* Icon */}
      <div className="w-[10%] flex items-center justify-center">
        <img src={job.portal_logo} alt="portal-logo" className="rounded-md" />
      </div>
      {/* Tema */}
      <div className="w-[60%]">
        <h3 className="text-lg flex items-center gap-4 mb-2">
          {job.name}{" "}
          <span className="text-xs px-1 py-2 bg-purple-100 text-purple-600 font-bold rounded-md">
            {job.modality}
          </span>
          <span className="text-xs px-1 py-2 bg-green-100 text-green-600 font-bold rounded-md">
            <a href={job.url}>Link</a>
          </span>
        </h3>
        <p className="text-gray-500 text-xs">{job.company}</p>
      </div>
      <div className="w-[20%]">
        <h4 className="text-blue-800 mb-2 text-xs">{job.webPortal}</h4>
        <p className="text-blue-400 text-xs">{job.publicationDate}</p>
      </div>
      <div className="w-[10%] flex flex-col">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-md mb-2 text-xs flex flex-row items-center"
          onClick={() => navigate(`/${job.id}`)}
        >
          <AiFillEdit className="mr-2" />
          Edit
        </button>
        <DeleteJob id={job.id}/>
      </div>
    </div>
  );
};

export default JobCard;

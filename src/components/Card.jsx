import React from "react";

const Card = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl p-8 flex gap-8 drop-shadow-lg mt-2">
      {/* Icon */}
      <div className="w-[10%] flex items-center justify-center">
        <img src={job.portal_logo} alt="portal-logo" />
      </div>
      {/* Tema */}
      <div className="w-[50%]">
        <h1 className="text-xl">
          {job.name}
          <span className="text-sm p-1 bg-purple-100 text-purple-600"><a href={job.url}>Link</a></span>
        </h1>
        <p>{job.company}</p>
      </div>

      <div className="w-[20%]">
        <h3>{job.webPortal}</h3>
        <p>{job.publicationDate}</p>
      </div>
    </div>
  );
};

export default Card;

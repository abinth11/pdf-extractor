import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  reverse?: boolean;
  sideImg?: string;
}

const AuthBackGround: React.FC<Props> = ({
  children,
  sideImg,
  reverse,   
}) => {
  return (
    <div
      className="bg-authentication-background bg-cover flex justify-center items-center w-screen h-screen py-7 px-5"
    >
      <div
        className={`bg-white w-full sm:max-w-[80%] min-h-[100%] overflow-auto rounded-md flex justify-center items-center shadow-xl p-3   gap-5 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
          <div className="font-semibold text-lg w-full">
            <span className="font-bold text-4xl">{"PDFSliceMaster"||<img className="w-32 ml-4 h-15" src={""} alt="image" />}</span> <br />
            Easy pdf Chopper
          </div>
          <img
            src={sideImg}
            className="w-full h-full object-cover"
            alt="login-page-vector"
          />
        </div>
        <div className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthBackGround;

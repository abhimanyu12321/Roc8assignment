import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Card;

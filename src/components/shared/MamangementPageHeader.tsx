import React from "react";

type TMamanagementPageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};
const MamangementPageHeader = ({
  title,
  description,
  children,
}: TMamanagementPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default MamangementPageHeader;

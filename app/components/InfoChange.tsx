import { ReactNode } from "react";

type InfoChangeProps = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const InfoChange = ({
  icon,
  title,
  description,
  className = "flex flex-col gap-2.5",
  titleClassName = "text-[32px] font-normal",
  descriptionClassName = "text-[16px] font-normal",
}: InfoChangeProps) => {
  return (
    <div className={className}>
      {icon}
      <h1 className={titleClassName}>{title}</h1>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
};

export default InfoChange;

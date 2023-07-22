import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className={`text-3xl font-bold w-full justify-center`}>
      <Loader className={`animate-spin m-auto`} />
    </div>
  );
};

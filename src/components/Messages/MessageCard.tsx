export const MessageCard = ({ message }: { message: string }) => {
  return (
    <div
      className={`m-2 sm:my-2 flex flex-col justify-center h-36 items-center text-center p-4 border-2 rounded-lg text-zinc-800 dark:text-zinc-100`}
    >
      <div className={`text-xl`}>{message}</div>
    </div>
  );
};

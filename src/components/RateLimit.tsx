export const RateLimit = () => {
  return (
    <div
      className={`flex flex-col justify-center items-center p-4 border-2 rounded-lg text-zinc-800 dark:text-zinc-100`}
    >
      <div className={`text-3xl font-bold`}>Rate Limit</div>
      <div className={`text-xl`}>You are being rate limited.</div>

      <div className={`text-xl`}>
        Please wait a few minutes before trying again.
      </div>
    </div>
  );
};

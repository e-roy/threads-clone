export const VideoComponent: React.FC<{ source: string }> = ({ source }) => {
  return (
    <div>
      <video width="320" height="240" controls>
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

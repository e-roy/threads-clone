// components/icons/VerifiedIcon.tsx

enum IconSize {
  SMALL = "16",
  MEDIUM = "24",
}

interface VerifiedIconProps {
  size?: keyof typeof IconSize;
}

export const VerifiedIcon: React.FC<VerifiedIconProps> = ({
  size = "SMALL",
}) => {
  const iconSize = IconSize[size];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="#0095F6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-badge-check"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

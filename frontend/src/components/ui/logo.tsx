export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 20h4l5-10-5-10H7L2 12l5 8z" />
      <path d="M17 4h4l-5 10 5 10h-4l-5-10z" />
    </svg>
  );
}
import type { SVGProps } from "react";

type IconProps = { size?: number } & SVGProps<SVGSVGElement>;

function fill(size: number, props: SVGProps<SVGSVGElement>) {
  return { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", ...props };
}
function stroke(size: number, props: SVGProps<SVGSVGElement>) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export const PlayIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...fill(size, p)}><path d="M8 5v14l11-7z" /></svg>
);
export const PauseIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...fill(size, p)}><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
);
export const MenuIcon = ({ size = 20, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
export const CloseIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
);
export const ArrowRightIcon = ({ size = 15, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeftIcon = ({ size = 15, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const CheckIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M20 6L9 17l-5-5" /></svg>
);
export const PlusIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
export const MinusIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
export const ChevronRightIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M9 18l6-6-6-6" /></svg>
);
export const ChevronDownIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const LockIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><rect x="4" y="11" width="16" height="10" rx="0" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const HeartIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
);
export const CartIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
);
export const SearchIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
export const StarIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...fill(size, p)}><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
);
export const UpvoteIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M12 5l7 8h-4v6H9v-6H5z" /></svg>
);
export const DownvoteIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M12 19l-7-8h4V5h6v6h4z" /></svg>
);
export const CommentIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M21 11.5a8.5 8.5 0 0 1-11.5 8L3 21l1.5-6.5A8.5 8.5 0 1 1 21 11.5z" /></svg>
);
export const RepostIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
);
export const ShareIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
);
export const BookmarkIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
);
export const UserIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
export const CalendarIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><rect x="3" y="4" width="18" height="18" rx="0" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /></svg>
);
export const MapPinIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const ClockIcon = ({ size = 16, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const PlaneIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...stroke(size, p)}><path d="M17.8 19.2L16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.5 4-2 2-2.5-.5a.5.5 0 0 0-.5.8L5 17l1.7 3.2a.5.5 0 0 0 .8-.1l2-2.5 4 3.5a.5.5 0 0 0 .8-.5z" /></svg>
);

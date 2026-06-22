import type { ReactNode } from "react";

type StripeLinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function StripeLinkButton({
  href,
  children,
  className = "",
}: StripeLinkButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-ink bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream shadow-[0_10px_30px_rgba(26,46,59,0.16)] transition duration-300 hover:-translate-y-0.5 hover:border-pink hover:bg-pink hover:text-ink focus-visible:outline-blue ${className}`}
    >
      {children}
      <span className="ml-3 text-lg leading-none" aria-hidden>
        &rarr;
      </span>
    </a>
  );
}

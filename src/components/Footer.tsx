export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer fade-up relative z-10"
      style={{ "--stagger": 8 } as React.CSSProperties}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="text-sm text-ink-soft">
          Un index de petits projets web.
        </p>
        <p className="label text-ink-soft">&copy; {year}</p>
      </div>
    </footer>
  );
}

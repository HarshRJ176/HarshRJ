interface SectionHeadingProps {
  code: string;
  title: string;
  kicker?: string;
}

export function SectionHeading({ code, title, kicker }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="section-heading-code">{code}</span>
      <div>
        {kicker && <p className="section-heading-kicker">{kicker}</p>}
        <h2 className="section-heading-title">{title}</h2>
      </div>
    </header>
  );
}

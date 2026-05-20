export default function SectionCard({
  title,
  subtitle,
  children,
  rightContent,
  className = "",
}) {
  return (
    <section className={`section-card ${className}`}>
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {rightContent && <div className="section-right">{rightContent}</div>}
      </div>

      <div className="section-content">{children}</div>
    </section>
  );
}
/** Standard page-title pattern: kicker + H1 + 2px rule. */
export function PageHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(40px, 6vw, 80px) 32px" }}
      >
        <div className="kicker" style={{ marginBottom: 18 }}>
          {kicker}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 92px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {title}
        </h1>
      </section>
      <hr className="rule" />
    </>
  );
}

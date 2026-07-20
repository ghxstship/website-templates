import Link from "next/link";
import { getSiteData } from "@/lib/data";
import { Placeholder } from "@/components/Placeholder";
import { PlayButton } from "@/components/player/PlayButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PlayIcon } from "@/components/icons";

export const revalidate = 60;

export default async function HomePage() {
  const { config, stats, albums, shows } = await getSiteData();
  const latest = albums.find((a) => a.is_latest) ?? albums[0];
  const latestTrack = latest?.tracks[0];
  const showsPreview = shows.slice(0, 4);

  return (
    <div className="fadein">
      {/* ---- Hero ---- */}
      <section
        className="wrap split2"
        style={{
          paddingBlock: "clamp(40px, 7vw, 96px) clamp(36px, 5vw, 72px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "clamp(28px, 5vw, 72px)",
          alignItems: "end",
        }}
      >
        <div>
          <div className="kicker" style={{ marginBottom: 24 }}>
            {config.genre} — {config.location}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(56px, 11vw, 148px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              margin: "0 0 28px",
              textTransform: "uppercase",
            }}
          >
            {config.artist_name}
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 1.5vw, 21px)",
              lineHeight: 1.5,
              maxWidth: "46ch",
              margin: "0 0 32px",
              color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
            }}
          >
            {config.tagline}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {latestTrack ? (
              <PlayButton
                title={latestTrack.name}
                album={latest.title}
                dur={latestTrack.seconds}
                className="btn btn-primary"
                style={{ padding: "12px 20px" }}
              >
                <PlayIcon size={16} />
                Play latest
              </PlayButton>
            ) : null}
            <Link
              href="/tour"
              className="btn btn-secondary"
              style={{ padding: "12px 20px" }}
            >
              Tour dates
            </Link>
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5" }}>
          <Placeholder label="Artist portrait" />
        </figure>
      </section>

      <hr className="rule" />

      {/* ---- Stat row ---- */}
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 56px)" }}>
        <div
          className="grid4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(30px, 3.4vw, 46px)",
                  color: "var(--color-accent)",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
                  marginTop: 10,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule" />

      {/* ---- Latest release ---- */}
      {latest ? (
        <>
          <section
            className="wrap split2"
            style={{
              paddingBlock: "clamp(40px, 6vw, 80px)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: "clamp(28px, 5vw, 64px)",
              alignItems: "center",
            }}
          >
            <figure
              className="grayscale"
              style={{ margin: 0, aspectRatio: "1/1" }}
            >
              <Placeholder label="Album cover" />
            </figure>
            <div>
              <div className="kicker" style={{ marginBottom: 18 }}>
                Latest release — {latest.year}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(36px, 4.6vw, 60px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 20px",
                }}
              >
                {latest.title}
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  maxWidth: "48ch",
                  margin: "0 0 26px",
                  color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
                }}
              >
                {latest.blurb ?? config.latest_blurb ?? ""}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {latestTrack ? (
                  <PlayButton
                    title={latestTrack.name}
                    album={latest.title}
                    dur={latestTrack.seconds}
                    className="btn btn-primary"
                    style={{ padding: "11px 18px" }}
                  >
                    <PlayIcon size={15} />
                    Play album
                  </PlayButton>
                ) : null}
                <Link
                  href="/music"
                  className="btn btn-secondary"
                  style={{ padding: "11px 18px" }}
                >
                  All music
                </Link>
              </div>
            </div>
          </section>
          <hr className="rule" />
        </>
      ) : null}

      {/* ---- Tour preview ---- */}
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              letterSpacing: "-0.02em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            On tour
          </h2>
          <Link href="/tour" className="btn btn-ghost">
            All dates →
          </Link>
        </div>
        <div>
          {showsPreview.map((show) => (
            <div
              key={show.id}
              className="row-line"
              style={{
                display: "grid",
                gridTemplateColumns: "120px minmax(0, 1fr) minmax(0, 1fr) auto",
                gap: 20,
                alignItems: "center",
                paddingBlock: 20,
                borderTop: "2px solid var(--color-divider)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {show.date_label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                {show.city}
              </div>
              <div
                className="row-venue"
                style={{
                  fontSize: 14,
                  color: "color-mix(in srgb, var(--color-text) 65%, transparent)",
                }}
              >
                {show.venue}
              </div>
              <Link
                href="/tour"
                className="btn btn-secondary"
                style={{ padding: "8px 16px" }}
              >
                Tickets
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Newsletter poster ---- */}
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div
          className="wrap split2"
          style={{
            paddingBlock: "clamp(44px, 6vw, 80px)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: 32,
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(30px, 4vw, 52px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Never miss
            <br />a release.
          </h2>
          <div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                margin: "0 0 20px",
                maxWidth: "42ch",
              }}
            >
              First listens, ticket presales and tour announcements — direct, no
              noise.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

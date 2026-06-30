import { getYouTubeId, type WorkItem } from "@/lib/work";

type WorkRow = { layout: "verticals" | "horizontals" | "mixed"; items: WorkItem[] };

function packWorkRows(items: WorkItem[]): WorkRow[] {
  const rows: WorkRow[] = [];
  let index = 0;

  while (index < items.length) {
    const nextThree = items.slice(index, index + 3);
    const verticals = nextThree.filter((item) => item.orientation === "vertical").length;
    const canUseThree = nextThree.length === 3 && (verticals === 3 || verticals === 2);
    let rowItems: WorkItem[];

    if (canUseThree) rowItems = nextThree;
    else if (items[index]?.orientation === "horizontal" && items[index + 1]?.orientation === "horizontal") {
      rowItems = items.slice(index, index + 2);
    } else {
      rowItems = items.slice(index, index + Math.min(2, items.length - index));
    }

    const allVertical = rowItems.every((item) => item.orientation === "vertical");
    const allHorizontal = rowItems.every((item) => item.orientation === "horizontal");
    rows.push({ layout: allVertical ? "verticals" : allHorizontal ? "horizontals" : "mixed", items: rowItems });
    index += rowItems.length;
  }

  return rows;
}

function WorkVideo({ item }: { item: WorkItem }) {
  if (item.provider === "youtube") {
    const videoId = getYouTubeId(item.source);
    if (!videoId) return null;
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={item.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return <video src={item.source} controls playsInline preload="metadata" aria-label={item.title} />;
}

export function SelectedWork({ items }: { items: WorkItem[] }) {
  if (items.length === 0) {
    return (
      <section className="work-placeholder" id="work" aria-label="Selected work coming soon">
        <p className="section-label">Selected work</p>
        <div><span>Case studies are being cut.</span><strong>Coming soon.</strong></div>
      </section>
    );
  }

  const rows = packWorkRows(items);
  return (
    <section className="selected-work" id="work">
      <header className="work-header">
        <p className="section-label">Selected work</p>
        <h2>Directed to feel real.<br /><span>Built to perform.</span></h2>
      </header>
      <div className="work-rows">
        {rows.map((row, rowIndex) => (
          <div className={`work-row ${row.layout}`} key={`${rowIndex}-${row.items[0]?.id}`}>
            {row.items.map((item) => (
              <article className={`work-card ${item.orientation}`} key={item.id}>
                <div className="work-video"><WorkVideo item={item} /></div>
                <div className="work-copy">
                  <p>{item.provider === "youtube" ? "YouTube" : "HookCast original"} · {item.orientation}</p>
                  <h3>{item.title}</h3>
                  {item.description ? <span>{item.description}</span> : null}
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

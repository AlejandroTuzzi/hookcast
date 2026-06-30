import type { ProjectLead } from "@/lib/leads";

export function LeadInbox({ leads }: { leads: ProjectLead[] }) {
  if (leads.length === 0) return <p className="work-empty">No project requests yet.</p>;

  return (
    <div className="lead-inbox">
      {leads.map((lead) => (
        <article className="lead-card" key={lead.id}>
          <header>
            <div><span>{lead.brand}</span><h3>{lead.name}</h3></div>
            <time dateTime={lead.createdAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(lead.createdAt))}</time>
          </header>
          <p>{lead.message}</p>
          <dl>
            <div><dt>Budget</dt><dd>{lead.budget}</dd></div>
            <div><dt>Timeline</dt><dd>{lead.timeline}</dd></div>
            {lead.website ? <div><dt>Website</dt><dd>{lead.website}</dd></div> : null}
          </dl>
          <a className="admin-button" href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.brand} × HookCast`)}`}>Reply to {lead.email}</a>
        </article>
      ))}
    </div>
  );
}

import { siteContact } from "@mrsign/content";

export type EmailDetailRow = readonly [label: string, value: string];

type EmailCta = {
  label: string;
  href: string;
};

type BuildEmailHtmlInput = {
  title: string;
  intro: string;
  eyebrow?: string;
  badge?: string;
  rows?: readonly EmailDetailRow[];
  cta?: EmailCta;
  note?: string;
};

const brandBlue = "#1d4ed8";
const brandRed = "#E51B23";
const ink = "#111827";
const muted = "#5b677a";
const border = "#d9e5f2";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildRows(rows: readonly EmailDetailRow[]) {
  return rows
    .map(([label, value], index) => {
      const rowBorder =
        index === rows.length - 1 ? "none" : `1px solid ${border}`;

      return `<tr><th align="left" style="padding:15px 18px 15px 0;border-bottom:${rowBorder};vertical-align:top;width:190px;color:${ink};font-size:14px;line-height:1.45;font-weight:800">${escapeHtml(label)}</th><td style="padding:15px 0;border-bottom:${rowBorder};vertical-align:top;color:${ink};font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`;
    })
    .join("");
}

function buildDetailsTable(rows: readonly EmailDetailRow[] | undefined) {
  if (!rows || rows.length === 0) return "";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"><tbody>${buildRows(rows)}</tbody></table>`;
}

function buildDetailsSection(rows: readonly EmailDetailRow[] | undefined) {
  const table = buildDetailsTable(rows);

  if (!table) return "";

  return `<tr><td style="padding:0 32px 30px"><div style="background:#f8fafc;border:1px solid ${border};border-radius:20px;padding:4px 20px 2px">${table}</div></td></tr>`;
}

function buildCta(cta: EmailCta | undefined) {
  if (!cta) return "";

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0"><tr><td style="border-radius:999px;background:${brandRed}"><a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-size:13px;line-height:1;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border-radius:999px">${escapeHtml(cta.label)}</a></td></tr></table>`;
}

function buildNote(note: string | undefined) {
  if (!note) return "";

  return `<div style="margin:24px 0 0;padding:16px 18px;background:#fff7ed;border:1px solid #fed7aa;border-radius:18px;color:#7c2d12;font-size:13px;line-height:1.55;word-break:break-word">${escapeHtml(note)}</div>`;
}

export function buildBrandedEmailHtml(input: BuildEmailHtmlInput) {
  const eyebrow = input.eyebrow ?? siteContact.businessName;
  const badge = input.badge
    ? `<span style="display:inline-block;margin:0 0 14px;padding:8px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:999px;color:${brandBlue};font-size:12px;line-height:1;font-weight:800;letter-spacing:.06em;text-transform:uppercase">${escapeHtml(input.badge)}</span>`
    : "";

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(input.title)}</title></head><body style="margin:0;padding:0;background:#eef4fb;color:${ink};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#eef4fb;border-collapse:collapse"><tr><td align="center" style="padding:34px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:720px;border-collapse:separate;border-spacing:0"><tr><td style="padding:5px;background:#dbe7f3;border:1px solid #c9d9ec;border-radius:28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#ffffff;border-collapse:separate;border-spacing:0;border-radius:23px;overflow:hidden"><tr><td style="height:8px;background:${brandBlue};font-size:0;line-height:0"><span style="display:block;width:34%;height:8px;background:${brandRed}">&nbsp;</span></td></tr><tr><td style="padding:30px 32px 28px"><p style="margin:0 0 10px;color:${brandBlue};font-size:15px;line-height:1.35;font-weight:900;letter-spacing:-.01em">${escapeHtml(eyebrow)}</p>${badge}<h1 style="margin:0;color:${ink};font-size:34px;line-height:1.08;font-weight:900;letter-spacing:-.04em">${escapeHtml(input.title)}</h1><p style="margin:20px 0 0;color:${muted};font-size:17px;line-height:1.65">${escapeHtml(input.intro)}</p>${buildCta(input.cta)}${buildNote(input.note)}</td></tr>${buildDetailsSection(input.rows)}<tr><td style="padding:20px 32px 26px;background:#0f172a;color:#dbeafe"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td style="padding:0;color:#ffffff;font-size:14px;line-height:1.5;font-weight:800">${escapeHtml(siteContact.businessName)}</td></tr><tr><td style="padding:7px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6">${escapeHtml(siteContact.phone)} &nbsp;|&nbsp; ${escapeHtml(siteContact.email)}<br>${escapeHtml(siteContact.shortAddress)}</td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>`;
}

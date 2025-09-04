import type { SponsorData } from "@shared/api";

export const sponsorCsvFields: (keyof SponsorData)[] = [
  "Company",
  "Website",
  "Social website",
  "Town",
  "Industry",
  "Main tier",
  "Sub tier",
  "Date Added",
];

export function toCsv(rows: SponsorData[], fields: (keyof SponsorData)[] = sponsorCsvFields): string {
  const esc = (val: any) => {
    const s = val == null ? "" : String(val);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const header = fields.join(",");
  const body = rows.map(r => fields.map(f => esc((r as any)[f])).join(",")).join("\n");
  return header + "\n" + body;
}

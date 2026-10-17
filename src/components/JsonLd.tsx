// Structured data for search engines. `<` is escaped so content can never close the script tag.
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);

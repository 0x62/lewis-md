export default function NotFound() {
  return (
    <main className="page">
      <div className="filename" aria-hidden="true">lewis.md</div>
      <h1><span className="marker" aria-hidden="true"># </span>Page not found</h1>
      <p>There’s no Markdown page for this address.</p>
    </main>
  );
}

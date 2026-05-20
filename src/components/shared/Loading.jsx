export default function Loading({ text = "Memuat data..." }) {
  return (
    <div className="loading-wrapper">
      <div className="loading-spinner" />
      <p>{text}</p>
    </div>
  );
}
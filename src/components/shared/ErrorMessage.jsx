export default function ErrorMessage({ errors = [] }) {
  if (!errors.length) return null;

  return (
    <div className="error-box">
      <strong>Sebagian data gagal dimuat.</strong>
      <ul>
        {errors.map((error, index) => (
          <li key={`${error.name}-${index}`}>
            {error.name}: {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
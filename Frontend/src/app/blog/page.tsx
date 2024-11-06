export default function Blog() {
  return (
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
}

export default function ComingSoon({ title, owner, children }) {
  return (
    <section>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">Workstream: {owner}</p>
      <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-gray-600">
        {children}
      </div>
    </section>
  );
}

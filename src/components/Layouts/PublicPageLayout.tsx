export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto my-10 h-full w-3/4">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {children}
      </div>
    </main>
  );
}

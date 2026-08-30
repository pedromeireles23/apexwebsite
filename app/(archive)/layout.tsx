import LegendShowcase from "../components/LegendShowcase";

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <LegendShowcase />
      {children}
    </main>
  );
}

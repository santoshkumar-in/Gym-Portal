import FitNxtRootLayout from "@/components/Layouts/RootLayout";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <FitNxtRootLayout>
      {children}
      {modal}
    </FitNxtRootLayout>
  );
}

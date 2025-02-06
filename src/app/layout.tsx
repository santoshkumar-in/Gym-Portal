import FitNxtRootLayout from "@/components/Layouts/RootLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FitNxtRootLayout>{children}</FitNxtRootLayout>;
}

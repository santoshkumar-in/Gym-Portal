import FitNxtRootLayout from "@/components/Layouts/RootLayout";
import { UploadProvider } from "@/context/UploadProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FitNxtRootLayout>
      <UploadProvider>{children}</UploadProvider>
    </FitNxtRootLayout>
  );
}

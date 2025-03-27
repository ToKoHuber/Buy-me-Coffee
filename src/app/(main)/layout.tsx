import { Header } from "../_components/header/Header";
import { Navigation } from "../_components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-[100vw] items-center">
      <div className="flex flex-col gap-[44px]">
        <Header />
        <div className="max-w-[1440px] flex px-4 py-2 justify-between">
          <Navigation />
          {children}
        </div>
      </div>
    </div>
  );
}

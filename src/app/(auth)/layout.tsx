import { SideWithPicture } from "./_components/SideWithPicture";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-[#FFFFFF]">
      {children}
      <SideWithPicture />
    </div>
  );
}

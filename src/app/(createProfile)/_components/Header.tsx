import { Logo } from "@/app/_components/logo";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <div className="w-[1440px] flex justify-between px-4 py-2">
      <Logo />
      <Button variant="secondary">Log out</Button>
    </div>
  );
}

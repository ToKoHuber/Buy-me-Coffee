import { Logo } from "@/app/_components/logo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <div className="w-[1440px] flex justify-between px-4 py-2">
      <Logo />
      <Button variant="secondary" onClick={() => router.push("/signup")}>
        Log out
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
  return (
    <div className="flex flex-col gap-2 max-w-[250px]">
      <Button asChild className="text-start">
        <Link href="/home" className="text-start">
          Home
        </Link>
      </Button>
      <Button asChild>
        <Link href="/explore">Explore</Link>
      </Button>
      <Button asChild>
        <Link href="/view-page">View page</Link>
      </Button>
      <Button asChild>
        <Link href="/settings">Account settings</Link>
      </Button>
    </div>
  );
}

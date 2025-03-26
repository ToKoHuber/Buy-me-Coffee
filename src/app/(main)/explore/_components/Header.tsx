import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[20px] font-semibold leading-7">Explore creators</h2>
      <Input type="text" placeholder="Search name" className="max-w-[250px]" />
    </div>
  );
}

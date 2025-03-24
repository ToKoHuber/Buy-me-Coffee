import { Coffee } from "lucide-react";

export function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <Coffee />
      <h1 className="text-4 text-[#09090B] leading-5 font-bold">
        Buy Me Coffee
      </h1>
    </div>
  );
}

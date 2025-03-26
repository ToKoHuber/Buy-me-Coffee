import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DateFilter } from "./DateFilter";
import { Button } from "@/components/ui/button";

export function Profile() {
  return (
    <div className="flex flex-col gap-3 w-[100%] p-6 rounded-[8px] border-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-bold leading-6 text-[#09090B]">
              Jake
            </h3>
            <p className="text-sm leading-5 font-normal text-[#09090B]">
              buymeacoffee.com/baconpancakes1
            </p>
          </div>
        </div>
        <Button>Share page link</Button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <h2 className="text-[20px] leading-7 font-semibold">Earnings</h2>
          <DateFilter />
        </div>

        <h1 className="text-[36px] font-bold leading-10">450$</h1>
      </div>
    </div>
  );
}

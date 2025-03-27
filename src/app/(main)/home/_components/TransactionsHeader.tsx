import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function TransactionsHeader() {
  return (
    <div className="w-[100%] flex justify-between">
      <h2 className="text-[16px] font-semibold leading-6">
        Recent Transaction
      </h2>
      <Button variant="outline">
        <ChevronDown /> Amount
      </Button>
      {/* <h3 className="text-[14px] font-medium leading-5"></h3> */}
    </div>
  );
}

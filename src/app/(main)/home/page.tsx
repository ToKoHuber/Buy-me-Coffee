import { Profile } from "./_components/Profile";
import { Transaction } from "./_components/Transactions";
import { TransactionsHeader } from "./_components/TransactionsHeader";

export default function Home() {
  return (
    <div className="w-[100%] px-6 flex flex-col gap-6">
      <Profile />
      <div className="flex flex-col gap-3">
        <TransactionsHeader />
        <Transaction />
      </div>
    </div>
  );
}

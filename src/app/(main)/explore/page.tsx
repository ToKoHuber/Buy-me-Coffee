import { Dashboard } from "./_components/Dahsboard";
import { Header } from "./_components/Header";

export default function Explore() {
  return (
    <div className="w-[100%] px-6 flex flex-col gap-6 p-6">
      <Header />
      <Dashboard />
    </div>
  );
}

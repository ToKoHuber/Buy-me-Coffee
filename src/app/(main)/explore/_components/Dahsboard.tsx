import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-[8px] border-[1px]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-[20px] font-semibold leading-7">Space Ranger</h2>
        </div>
        <Button>View Profile</Button>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-[16px] font-semibold leading-6">
            About Space ranger
          </h2>
          <p>
            All day, every day, we're watching, listening to, reading and
            absorbing politics. It's exhausting. We then report on what we've
            seen in a way that's as chill as possible. None of the
            sensationalism and division you'll find elsewhere. It's about
            clarity, focus, approachability, and having a little wry smile
            almost all the time.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[16px] font-semibold leading-6">
            Social media URL
          </h2>
          <p>https://buymeacoffee.com/ifmonster23</p>
        </div>
      </div>
    </div>
  );
}

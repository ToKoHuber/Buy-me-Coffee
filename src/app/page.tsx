import { SideWithPicture } from "./(auth)/_components/SideWithPicture";
import { Logo } from "./(auth)/login/page";
import { FindUserName } from "./(auth)/signup/_components/FindUserName";

export default function Home() {
  return (
    <div className="flex">
      {/* <SideWithPicture /> */}
      <FindUserName />
    </div>
  );
}

import { SideWithPicture } from "./(auth)/_components/SideWithPicture";
import { Login, Logo } from "./(auth)/login/page";
import { FindUserName } from "./(auth)/signup/_components/FindUserName";
import { Signup } from "./(auth)/signup/_components/Singup";

export default function Home() {
  return (
    <div className="flex">
      {/* <SideWithPicture /> */}
      <FindUserName />
      <Signup />
      <Login />
    </div>
  );
}

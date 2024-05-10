import PageTitle from "@/components/PageTitle";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ProfilePage = () => {
  return (
    <div>
      <PageTitle title="Profile" />

      <div className="my-4 max-w-[50%]">
        <div className="my-4">
          <Avatar className="h-36 w-36">
            <AvatarImage src="" alt="@jevin" className="object-cover" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
        <form className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Name</Label>
            <Input type="text" value={`User 1`} disabled />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Username</Label>
            <Input type="text" value={`user1`} disabled />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Role</Label>
            <Input type="text" value={`admin`} disabled />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;


type AvatarProps = {
  name: string
};
const Avatar = ({ name }: AvatarProps) => {
      const initials = name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

  return (
    <div className="h-12 w-12 rounded-full bg-blue-600 text-white grid place-items-center text-lg font-bold">
      {initials}
    </div>
  );
}

export default Avatar

import defaultAvatar from "../../assets/images/default_user_avatar.jpg";
interface AvatarProps {
  id: string;
  avatarUrl?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ id, avatarUrl, size }) => {
  return (
    <div className="rounded-full overflow-hidden inline-block">
      <img
        src={avatarUrl ?? defaultAvatar}
        alt=""
        width={size ?? 20}
        height={size ?? 20}
      />
    </div>
  );
};

export default Avatar;

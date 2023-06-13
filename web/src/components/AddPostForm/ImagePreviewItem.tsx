import { ReactComponent as CloseIcon } from "../../assets/svg/close.svg";
interface ImagePreviewItemProp {
  url: string;
  onRemove: () => void;
}
const ImagePreviewItem: React.FC<ImagePreviewItemProp> = ({
  url,
  onRemove,
}) => {
  return (
    <div
      className="max-w-full flex-1 min-w-[245px] bg-center bg-cover bg-no-repeat aspect-[4/5] rounded-xl relative"
      style={{ backgroundImage: `url(${url})` }}
    >
      <div
        className="absolute px-1 py-1 top-2 left-2 bg-[#1b1f22] rounded-full"
        onClick={onRemove}
      >
        <CloseIcon width={18} height={18} fill="#fff" />
      </div>
    </div>
  );
};

export default ImagePreviewItem;

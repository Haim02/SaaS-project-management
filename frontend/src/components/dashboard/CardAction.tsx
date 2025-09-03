import type { IconType } from "../../types/icon";

type CardActionProps = {
  title: string;
  subtitle?: string;
  icon: IconType
  onClick: () => void;
  disabled?: boolean;
};

const CardAction = ({title,subtitle,icon: Icon,onClick,disabled}: CardActionProps) => {
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-right bg-white border rounded-2xl p-4 shadow-sm w-full transition
                  ${
                    disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{subtitle}</div>
          <div className="text-base font-semibold">{title}</div>
        </div>
        <div className="rounded-xl p-2 bg-gray-50 border">
          <Icon className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </button>
  );
};

export default CardAction

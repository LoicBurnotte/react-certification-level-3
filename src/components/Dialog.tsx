import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  blur?: boolean;
  closeOnClickingOutside?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  hideCloseButton?: boolean;
  open?: boolean;
  onClose: () => void;
}

const Dialog = ({
  blur,
  children,
  closeOnClickingOutside,
  footer,
  header,
  hideCloseButton,
  open,
  onClose,
}: IProps) => {
  if (!open) return null;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        blur ? "backdrop-blur-sm pointer-events-auto" : "pointer-events-none",
        !blur && closeOnClickingOutside && "pointer-events-auto",
        "absolute top-0 left-0 z-2 w-full h-full p-4 flex justify-center items-center"
      )}
      onClick={() => closeOnClickingOutside && onClose()}
    >
      <div
        id="modal"
        className="relative min-w-64 min-h-8 bg-gray-100 dark:bg-gray-600 flex flex-col shadow-md rounded-md p-4 z-3 pointer-events-auto"
        onClick={handleContentClick}
      >
        {!hideCloseButton && (
          <button
            className="btn absolute text-black dark:text-white right-1 top-1 text-xs bg-transparent"
            onClick={onClose}
          >
            X
          </button>
        )}
        {!!header && (
          <>
            <span className="font-semibold text-xl">{header}</span>
            <hr className="my-2" />
          </>
        )}
        {children}
        {!!footer && (
          <div className="relative mt-2 pt-2 w-full flex">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Dialog;

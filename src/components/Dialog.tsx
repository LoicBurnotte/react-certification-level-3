import type { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  open?: boolean;
  allowOverlayAction?: boolean;
  blur?: boolean;
  hideCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

const Dialog = ({
  allowOverlayAction,
  blur,
  open,
  header,
  hideCloseButton,
  children,
  footer,
  onClose,
}: IProps) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    allowOverlayAction && onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${
        blur ? 'backdrop-blur-sm pointer-events-auto' : 'pointer-events-none'
      } absolute top-0 left-0 z-2 w-full h-full p-4 flex justify-center items-center `}
      onClick={handleOverlayClick}
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

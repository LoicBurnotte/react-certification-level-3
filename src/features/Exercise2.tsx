import { useState } from "react";
import Dialog from "@/components/Dialog";

const Exercise2 = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDefaultDialog, setOpenDefaultDialog] = useState(false);

  return (
    <>
      <h1 className="title">Exercise 2</h1>
      <div className="flex flex-col gap-4 m-auto max-w-82">
        {/* Can click outside the Dialog modal */}
        <button className="btn" onClick={() => setOpenModal(true)}>
          Open modal
        </button>
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          // allowOverlayAction
          header="Modal title"
          footer={
            <div className="w-full flex border-t-2 pt-3 justify-end gap-2">
              <button
                className="btn bg-gray-400"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://www.worldanimalprotection.org/about-us/",
                    "_blank"
                  )
                }
                className="btn w-[220px]"
              >
                Go to the elephant page →
              </button>
            </div>
          }
        >
          <>
            <div className="text-lg mb-2">Here is the content of my modal</div>
            <img
              src="https://www.worldanimalprotection.org/cdn-cgi/image/width=1920,format=auto/globalassets/images/elephants/1033551-elephant.jpg"
              width="400"
              height="300"
              alt="animal"
            />
          </>
        </Dialog>

        {/* Cannot click outside the Dialog modal */}
        <button className="btn" onClick={() => setOpenDialog(true)}>
          Open dialog
        </button>
        <Dialog
          blur
          open={openDialog}
          hideCloseButton
          onClose={() => setOpenDialog(false)}
          footer={
            <button className="btn" onClick={() => setOpenDialog(false)}>
              Close
            </button>
          }
        >
          Here is the content of the dialog with a close button in the
          footer&nbsp;&nbsp;&nbsp;
        </Dialog>

        {/* Default Dialog component */}
        <button className="btn" onClick={() => setOpenDefaultDialog(true)}>
          Open default dialog
        </button>
        <Dialog
          // allowOverlayAction
          // blur
          open={openDefaultDialog}
          onClose={() => setOpenDefaultDialog(false)}
        >
          Default dialog
        </Dialog>
      </div>
    </>
  );
};

export default Exercise2;

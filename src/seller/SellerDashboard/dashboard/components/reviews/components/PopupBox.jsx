import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Textarea,
} 
from "@material-tailwind/react";
import { addReply } from "@/services/reviewServices";

export default function PopupBox({ open, setOpen, id }) {
  const [reply, setReply ] = useState('');

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    const res = await addReply(id, reply);

    if (res.status === 200) {
      setOpen(false);
    } else {
      console.log("Error adding reply")
    }
  }

  return (
    <>
      <Dialog open={open} size="xs">
        <div className="flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleClose}
          >
          </svg>
        </div>
        <DialogBody>

          <div className="font-black py-5">
            Reply Comment
          </div>
          <div className="grid gap-6">
            <Textarea label="Comment" onChange={(e) => {
              setReply(e.target.value);
            }}/>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            Submit Reply
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}


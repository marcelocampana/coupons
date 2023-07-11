"use client";

import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const CallToAction = ({ label }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label={label} onClick={() => setOpen(true)} />
      <Modal open={open} setOpen={setOpen} />
    </>
  );
};

export default CallToAction;

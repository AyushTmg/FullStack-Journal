import React from "react";
import SubmitButton from "../../SubmitButton/SubmitButton";

export default function DeleteButton() {
  return (
    <div>
      <SubmitButton
        type="button"
        value="Delete"
        color="Red"
        width="150px"
        height="70px"
      />
    </div>
  );
}

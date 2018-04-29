import React from "react";
import { Header, Modal } from "semantic-ui-react";

const Confirmation = props => (
  <Modal
    open={props.open}
    basic
    size="small"
    closeIcon
    onClick={props.clearVillain}
  >
    <Header icon="shield" content={` ${props.message}`} />
    <Modal.Content />
  </Modal>
);

export default Confirmation;

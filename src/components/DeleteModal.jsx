import React, { useState } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

function DeleteModal(props) {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button color={props.buttonColor}>{props.buttonTriggerTitle}</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="archive" content="Archive Old Messages" />
      <Modal.Content>
        <p>
          Are You sure you want to Delete this User?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => onUserDeleted(props.user)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal

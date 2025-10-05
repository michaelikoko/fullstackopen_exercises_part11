import { Alert, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import baseUrl from '../baseUrl'

const AddNewModal = ({ show, handleClose, setContactList }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [formData, setFormData] = useState({
    contactName: '',
    contactNumber: '',
  })

  const handleCloseModal = () => {
    setFormData({
      contactName: '',
      contactNumber: '',
    })
    setAlertMessage('')
    setShowAlert(false)
    handleClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //console.log(formData)
    if (formData.contactName.length < 3) {
      setAlertMessage('Contact name should have more than 3 characters')
      setShowAlert(true)
      return
    } else if (formData.contactNumber.length < 8) {
      setAlertMessage('Contact number should have more than 8 characters')
      setShowAlert(true)
      return
    }

    axios
      .post(baseUrl, {
        name: formData.contactName,
        number: formData.contactNumber,
      })
      .then((response) => {
        //console.log(response.data)
        setContactList((prevContactList) => [
          ...prevContactList,
          response.data,
        ])
        handleCloseModal()
      })
      .catch((error) => {
        //console.log('error', error)
        if (error.response?.status === 400) {
          setAlertMessage(error.response.data.error)
        } else {
          setAlertMessage('An error occurred!')
        }
        setShowAlert(true)
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <h5 className="modal-title" id="exampleModalLabel">
            Add Contact
          </h5>
        </div>
      </Modal.Header>
      {showAlert && (
        <Alert
          variant="danger"
          className="small m-0"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Contact Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g John Doe"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Number: </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g 123-456789"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddNewModal

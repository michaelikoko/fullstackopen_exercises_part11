import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { useState, useEffect } from 'react'
import AddNewModal from './components/AddNewModal'
import ContactList from './components/ContactList'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'
import baseUrl from './baseUrl'

const App = () => {
  const [showAddNewModal, setShowAddNewModal] = useState(false)
  const [contactList, setContactList] = useState([])
  const [loadingContacts, setLoadingContacts] = useState(true)

  const handleCloseAddNewModal = () => setShowAddNewModal(false)
  const handleShowAddNewModal = () => setShowAddNewModal(true)

  useEffect(() => {
    //console.log('fetching contacts')
    setLoadingContacts(true)
    axios.get(baseUrl)
      .then(response => {
        setContactList(response.data)
      })
      .catch(error => {
        //console.error('Error fetching contacts:', error)
      })
      .finally(() => {
        setLoadingContacts(false)
      })
  }, [])

  return (
    <div className="main">
      <AddNewModal
        show={showAddNewModal}
        handleClose={handleCloseAddNewModal}
        setContactList={setContactList}
      />

      <div className="phonebook-container my-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
          alt=""
          width="80"
        />
        <h1>Phonebook App</h1>

        <div className="d-flex flex-column align-items-center justify-content-center w-100">

          <div className="d-flex flex-row align-items-center justify-content-between w-100 py-2">
            <h5 className="font-monospace">List of Contacts</h5>
            <button
              type="button"
              className="btn btn-primary float-right"
              onClick={handleShowAddNewModal}
            >
              + Add New
            </button>
          </div>

          {
            loadingContacts ?
              <div className="w-100 d-flex flex-row justify-content-center align-items-center py-5">
                <Spinner animation="grow" size="sm" variant="primary" className="me-2"/>
                Loading Contacts ...
              </div> :
              <ContactList contactList={contactList} setContactList={setContactList} />
          }
        </div>

      </div>
    </div>
  )
}

export default App

import axios from 'axios'
import baseUrl from '../baseUrl'

const ContactList = ({ contactList, setContactList }) => {
  const numberOfContacts = contactList.length

  const deleteContact = (contactId) => {
    //console.log(contactId)
    axios
      .delete(`${baseUrl}/${contactId}`)
      .then((response) => {
        // console.log('Contact deleted:', response.data)
        setContactList(contactList.filter(contact => contact.id !== contactId))
      })
      .catch((error) => {
        // console.error('Error deleting contact:', error)
      })
  }

  return (
    <div className="phonebook d-flex flex-column align-items-center justify-content-center w-100">
      <div className="d-flex flex-row justify-content-start align-items-center w-100">
        <div className="font-monospace text-muted small fw-bold">
          Total: {numberOfContacts}
        </div>
      </div>
      {numberOfContacts === 0 ? (
        <div className="p-5">
          <span>Contact list is empty</span>
        </div>
      ) : (
        <ul className="list-group list-group-flush w-100" id="listOfContacts">
          {contactList.map((contact) => {
            return (
              <li className="list-group-item px-0" key={contact.id}>
                <span className="w-100">{contact.name}</span>
                <span className="w-100">{contact.number}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-danger col-1 ml-5"
                  onClick={() => deleteContact(contact.id)}
                >
                  X
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ContactList

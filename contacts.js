const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    if (!foundContact) {
      return 'contact not found';
    }
    return foundContact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexRemove = await contacts.findIndex(
      (contact) => contact.id === contactId
    );
    let msg = 'contact not found';
    if (!indexRemove) {
      return msg;
    } else {
      msg = `Your contact ${contacts[indexRemove].name} has been deleted`;
      contacts.splice(indexRemove, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return msg;
    }
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: String(contacts.length + 1),
      name,
      email,
      phone: String(phone),
    };
    const newContactsList = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

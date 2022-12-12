const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath, "utf-8");
      const contactsList = JSON.parse(data);
      return contactsList;
  } catch (err) {
      console.log(err);
  }
};

async function getContactById(contactId) {
  try {
      const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
      const contact = contacts.find(item => item.id === contactId);
      if (!contact) return null;
      return contact;   
  } catch(err) {
      console.log(err);
  }
  
};

async function removeContact(contactId) {
  try {
      const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
      const removedContactIndex = contacts.findIndex(contact => contact.id === contactId);
      if (removedContactIndex === -1) {
          return null;
      }
        
      const [removedContact] = contacts.splice(removedContactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return removedContact;
      
  } catch (error) {
      console.log(error);
  }
  
};

async function addContact(reqData) {
  try {
      const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
      const id = createId(contacts);
      console.log(reqData);

      const newContact = {id, ...reqData};
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
  } catch(err) {
      console.log(err);
  }   
};

function createId (list) {
  return String(list.length + 1);
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null
  }

  contacts[idx] = {...contacts[idx], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

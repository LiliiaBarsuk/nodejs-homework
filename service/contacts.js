const Contact = require("./schemas/contact")

const getAllContacts = async (id,  skip, limit) => {
    return Contact.find({owner: id}, "", {skip, limit});
};

const getContactById = (id) => {
    return Contact.findOne({ _id: id })
}

const createContact = ({ name, email, phone, favorite, owner }) => {
    return Contact.create({ name, email, phone, favorite, owner })
}

const updateContact = (id, ownerId, fields) => {
    return Contact.findByIdAndUpdate({ _id: id, owner: ownerId}, fields, { new: true })
}

const removeContact = (id, ownerId) => {
    return Contact.findOneAndDelete({
      id,
      owner: ownerId,
    });
}
  
module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
}
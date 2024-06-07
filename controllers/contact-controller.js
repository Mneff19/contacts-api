const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
}

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const userId =  new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
}

const createNewContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const newContact = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "favoriteColor": req.body.favoriteColor,
        "birthday": req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(newContact);

    if(response.hasOwnProperty("insertedId")) {
        res.status(201).json(response.insertedId);
    } else {
        res.status(500).json(response.error || "An error occurred creating a new contact.");
    }
}

const updateContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const updatedContact = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "favoriteColor": req.body.favoriteColor,
        "birthday": req.body.birthday
    };
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').replaceOne( { _id: userId }, updatedContact );

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred updating the contact.");
    }
}

const deleteContact = async (req, res, next) => {
    //#swagger.tags=['Contacts']
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });

    console.log(response);
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred deleting the contact.");
    }
}

module.exports = { getAll, getSingle, createNewContact, updateContact, deleteContact };
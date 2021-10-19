var AddressModel = require('../models/addressModel.js');

/**
 * addressController.js
 *
 * @description :: Server-side logic for managing addresss.
 */
module.exports = {

    /**
     * addressController.list()
     */
    list: function (req, res) {
        AddressModel.find(function (err, addresss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address.',
                    error: err
                });
            }

            return res.json(addresss);
        });
    },

    /**
     * addressController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        AddressModel.findOne({_id: id}, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address.',
                    error: err
                });
            }

            if (!address) {
                return res.status(404).json({
                    message: 'No such address'
                });
            }

            return res.json(address);
        });
    },

    /**
     * addressController.create()
     */
    create: function (req, res) {
        var address = new AddressModel({
			streetNo : req.body.streetNo,
			AptNo : req.body.AptNo,
			streetName : req.body.streetName,
			city : req.body.city,
			province_state : req.body.province_state,
			country : req.body.country,
			postalCode : req.body.postalCode
        });

        address.save(function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating address',
                    error: err
                });
            }

            return res.status(201).json(address);
        });
    },

    /**
     * addressController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        AddressModel.findOne({_id: id}, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting address',
                    error: err
                });
            }

            if (!address) {
                return res.status(404).json({
                    message: 'No such address'
                });
            }

            address.streetNo = req.body.streetNo ? req.body.streetNo : address.streetNo;
			address.AptNo = req.body.AptNo ? req.body.AptNo : address.AptNo;
			address.streetName = req.body.streetName ? req.body.streetName : address.streetName;
			address.city = req.body.city ? req.body.city : address.city;
			address.province_state = req.body.province_state ? req.body.province_state : address.province_state;
			address.country = req.body.country ? req.body.country : address.country;
			address.postalCode = req.body.postalCode ? req.body.postalCode : address.postalCode;
			
            address.save(function (err, address) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating address.',
                        error: err
                    });
                }

                return res.json(address);
            });
        });
    },

    /**
     * addressController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        AddressModel.findByIdAndRemove(id, function (err, address) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the address.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};

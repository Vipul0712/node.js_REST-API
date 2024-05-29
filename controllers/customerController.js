// controllers/customerController.js
const { sql, poolPromise } = require('../db/db');

// Validation function
const validateCustomer = (data) => {
    const { FirstName, LastName, Email, MobileNumber, Address, Pincode } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\+\d{1,3}\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    if (!FirstName || !LastName || !Email || !MobileNumber || !Address || !Pincode) {
        return 'All fields are required.';
    }// controllers/customerController.js
const { sql, poolPromise } = require('../db/db');

// Validation function (remains the same)

const addCustomer = async (req, res) => {
    // Validation logic (remains the same)
};

const getCustomers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM customer_db.dbo.Customers');
        res.status(200).json(result.recordset); // Return customers retrieved from the database
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve customers.' });
    }
};

module.exports = { addCustomer, getCustomers };

    if (!emailRegex.test(Email)) {
        return 'Invalid email format.';
    }
    if (!mobileRegex.test(MobileNumber)) {
        return 'Invalid mobile number format.';
    }
    if (!pincodeRegex.test(Pincode)) {
        return 'Invalid pincode format.';
    }
    return null;
};

const addCustomer = async (req, res) => {
    const validationError = validateCustomer(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const { FirstName, LastName, Email, MobileNumber, Address, Pincode } = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('FirstName', sql.NVarChar, FirstName)
            .input('LastName', sql.NVarChar, LastName)
            .input('Email', sql.NVarChar, Email)
            .input('MobileNumber', sql.NVarChar, MobileNumber)
            .input('Address', sql.NVarChar, Address)
            .input('Pincode', sql.NVarChar, Pincode)
            .execute('AddCustomer');
        res.status(201).json({ message: 'Customer added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add customer.' });
    }
};

module.exports = { addCustomer };

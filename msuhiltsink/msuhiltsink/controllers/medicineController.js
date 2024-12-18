const Medicine = require('../models/Medicine');

exports.getMedicines = async (req, res) => {
    try {
        const results = await Medicine.getAll(); // Using async/await
        res.render('medicines', { medicines: results });
    } catch (err) {
        console.error('Error fetching medicines:', err);
        res.status(500).send('Error fetching medicines');
    }
};

exports.addMedicine = async (req, res) => {
    const medicineData = req.body;

    try {
        await Medicine.create(medicineData); // Using async/await
        res.redirect('/medicines');
    } catch (err) {
        console.error('Error adding medicine:', err);
        res.status(500).send('Error adding medicine');
    }
};

exports.updateMedicine = async (req, res) => {
    const { id, name, expirydate, quantity, category } = req.body; // Adjust fields as needed

    try {
        // Update the medicine in the database
        await Medicine.update(id, { name, expirydate, quantity, category });
        res.redirect('/medicines'); // Redirect back to the medicines list after updating
    } catch (err) {
        console.error('Error updating medicine:', err);
        res.status(500).send('Error updating medicine');
    }
};

exports.deleteMedicine = async (req, res) => {
    const { id } = req.params;

    try {
        await Medicine.delete(id); // Using async/await
        res.redirect('/medicines');
    } catch (err) {
        console.error('Error deleting medicine:', err);
        res.status(500).send('Error deleting medicine');
    }
};

exports.getMedicinesByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const medicines = await Medicine.findAll({ where: { category: category } });
        res.json(medicines); // Return the medicines as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

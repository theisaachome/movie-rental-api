const { validateCustomer, Customer } = require("../model/Customer");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res, next) => {
    let customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res, next) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.get("/:id", async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});
router.put("/:id", async (req, res, next) => {
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        {new:true});
    res.send(customer);
});

router.delete("/:id", async (req, res, next) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});
module.exports = router;
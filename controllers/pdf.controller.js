const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const hbs = require('hbs');
const pdf = require('html-pdf'); 

exports.print = async (req, res) => {  
    const invoiceItems = [
        { 'item': 'Website Design', 'amount': 50.50 },
        { 'item': 'Hosting (3 months)', 'amount': 80.50 },
        { 'item': 'Domain (1 year)', 'amount': 10.50 }
    ]
    const invoiceData = {
        'invoice_id': 123,
        'transaction_id': 1234567,
        'payment_method': 'Paypal',
        'creation_date': 'M d, Y',
        'total_amount': 141.50
    }

    const content  = await readFile('views/invoice.hbs','utf8');  
    const template = hbs.compile(content);
    const html     = template({ invoiceItems, invoiceData });

    const options = {
        base: `${req.protocol}://${req.get('host')}`, // http://localhost:3000
        format: 'A4'
    }

    pdf.create(html, options).toBuffer((err, buffer) => { 
        if (err) return console.log(err);
        res.attachment('invoice.pdf')
        res.end(buffer);
    });
}
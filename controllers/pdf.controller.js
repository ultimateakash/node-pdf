const fs = require('fs');
const htmlPDF = require('puppeteer-html-pdf');
const readFile = require('util').promisify(fs.readFile);

exports.print = async (req, res) => {
    const pdfContext = {
        invoiceItems: [
            { item: 'Website Design', amount: 5000 },
            { item: 'Hosting (3 months)', amount: 2000 },
            { item: 'Domain (1 year)', amount: 1000 },
        ],
        invoiceData: {
            invoice_id: 123,
            transaction_id: 1234567,
            payment_method: 'Paypal',
            creation_date: '04-05-1993',
            total_amount: 141.5,
        },
        baseUrl: `${req.protocol}://${req.get('host')}` // http://localhost:3000
    }

    const options = {
        format: 'A4',
        context: pdfContext
    }

    try {
        const content = await readFile('views/invoice.hbs', 'utf8');
        const buffer = await htmlPDF.create(content, options);
        res.attachment('invoice.pdf')
        res.end(buffer);
    } catch (error) {
        console.log(error);
        res.send('Something went wrong.')
    }
}
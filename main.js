const express = require('express');
const JobService = require('./services/job_service');
const JobSchema = require('./models/job');
const CustomerService = require('./services/customer_service');
const CustomerSchema = require('./models/customer');
const InvoiceSchema = require('./models/invoice');
const InvoiceService = require('./services/invoice_service');

const port = process.env.PORT || 4000;

const app = express();

app.get('/', (req, res) => {
  const jobService = new JobService();
  jobService.getAll()
    .then((result) => { res.json(result); })
    .catch(() => {
      res.status(404);
      res.json({ error: 'error' });
    });

});

app.get('/create-test', (req, res) => {
  const customerService = new CustomerService();
  const jobService = new JobService();
  const customer = CustomerSchema.createMock().$properties;
  customerService.create(customer)
    .then((id) => JobSchema.createMock(id))
    .then(({ $properties }) => jobService.create($properties))
    .then((id) => { res.json({ id }); })
    .catch(() => {
      res.status(404);
      res.json({ error: 'bad request' });
    });
});

app.get('/create-invoice', (req, res) => {
  const invoiceService = new InvoiceService();
  invoiceService.getCount()
    .then(([materialCount, jobCount]) => {
      const { $properties } = InvoiceSchema.createMock(materialCount, jobCount);
      invoiceService.createNewInvoice($properties);
      res.json({ success: true });
    })
    .catch(() => {
      res.status(404);
      res.json({ success: false });
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`listining at http://localhost:${port}`);
});

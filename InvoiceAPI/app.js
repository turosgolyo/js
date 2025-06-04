import express from 'express';
import cors from 'cors';
import * as db from './util/db.js';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Middleware to validate payment deadline on create invoice
app.use(express.json());

app.post('/invoices', (req, res) => {
  const { invoice_date, payment_deadline } = req.body;
  const invoiceDate = new Date(invoice_date);
  const paymentDeadline = new Date(payment_deadline);
  const maxDeadline = new Date(invoiceDate);
  maxDeadline.setDate(invoiceDate.getDate() + 30);

  if (paymentDeadline > maxDeadline) {
    return res.status(400).json({ error: 'Payment deadline cannot be more than 30 days after invoice date' });
  }

  try {
    const newInvoice = db.createInvoice(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to cancel invoice (mark as canceled)
app.post('/invoices/:id/cancel', (req, res) => {
  const id = req.params.id;
  const invoice = db.getInvoiceById(id);
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  if (invoice.canceled) {
    return res.status(400).json({ error: 'Invoice already canceled' });
  }
  try {
    const canceled = db.cancelInvoice(id);
    if (canceled) {
      res.json({ message: 'Invoice canceled' });
    } else {
      res.status(500).json({ error: 'Failed to cancel invoice' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Prevent update of canceled invoices
app.put('/invoices/:id', (req, res) => {
  const id = req.params.id;
  const invoice = db.getInvoiceById(id);
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }
  if (invoice.canceled) {
    return res.status(400).json({ error: 'Cannot modify a canceled invoice' });
  }
  try {
    const updatedInvoice = db.updateInvoice(id, req.body);
    if (updatedInvoice) {
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete invoice endpoint should be disabled or return error
app.delete('/invoices/:id', (req, res) => {
  res.status(403).json({ error: 'Deleting invoices is not allowed. Please cancel the invoice instead.' });
});



app.get('/invoices', (req, res) => {
  const invoices = db.getAllInvoices();
  res.json(invoices);
});

app.get('/invoices/:id', (req, res) => {
  const invoice = db.getInvoiceById(req.params.id);
  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

app.post('/invoices', (req, res) => {
  try {
    const newInvoice = db.createInvoice(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/invoices/:id', (req, res) => {
  try {
    const updatedInvoice = db.updateInvoice(req.params.id, req.body);
    if (updatedInvoice) {
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete invoice
app.delete('/invoices/:id', (req, res) => {
  const deleted = db.deleteInvoice(req.params.id);
  if (deleted) {
    res.json({ message: 'Invoice deleted' });
  } else {
    res.status(404).json({ error: 'Invoice not found' });
  }
});

// Get all buyers (for frontend)
app.get('/buyers', (req, res) => {
  const buyers = db.getAllBuyers();
  res.json(buyers);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

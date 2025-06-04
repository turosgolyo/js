import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "InvoiceAPI", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "invoices.sqlite"), { verbose: console.log });

// Initialize database schema
db.prepare(`
  CREATE TABLE IF NOT EXISTS issuers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    tax_number TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS buyers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    tax_number TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    issuer_id INTEGER NOT NULL,
    buyer_id INTEGER NOT NULL,
    invoice_number TEXT NOT NULL,
    invoice_date TEXT NOT NULL,
    completion_date TEXT NOT NULL,
    payment_deadline TEXT NOT NULL,
    total_amount REAL NOT NULL,
    vat_amount REAL NOT NULL,
    canceled INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (issuer_id) REFERENCES issuers(id),
    FOREIGN KEY (buyer_id) REFERENCES buyers(id)
  )
`).run();

// Seed initial data if not present
const issuerCount = db.prepare("SELECT COUNT(*) AS count FROM issuers").get().count;
if (issuerCount === 0) {
  const insertIssuer = db.prepare("INSERT INTO issuers (name, address, tax_number) VALUES (?, ?, ?)");
  insertIssuer.run("Default Issuer Ltd.", "123 Issuer St, City", "12345678-1-12");

  const insertBuyer = db.prepare("INSERT INTO buyers (name, address, tax_number) VALUES (?, ?, ?)");
  const buyers = [
    ["Buyer One", "1 Buyer St, City", "11111111-1-11"],
    ["Buyer Two", "2 Buyer St, City", "22222222-2-22"],
    ["Buyer Three", "3 Buyer St, City", "33333333-3-33"],
  ];
  buyers.forEach((b) => insertBuyer.run(...b));

  const insertInvoice = db.prepare(`
    INSERT INTO invoices (issuer_id, buyer_id, invoice_number, invoice_date, completion_date, payment_deadline, total_amount, vat_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const issuerId = db.prepare("SELECT id FROM issuers LIMIT 1").get().id;
  const buyerIds = db.prepare("SELECT id FROM buyers").all().map((row) => row.id);

  buyerIds.forEach((buyerId) => {
    for (let i = 1; i <= 3; i++) {
      const invoiceNumber = "INV-" + buyerId + "-00" + i;
      const invoiceDate = "2024-01-01";
      const completionDate = "2024-01-05";
      const paymentDeadline = "2024-01-15";
      const totalAmount = 1000 * i;
      const vatAmount = totalAmount * 0.27; // 27% VAT
      insertInvoice.run(
        issuerId,
        buyerId,
        invoiceNumber,
        invoiceDate,
        completionDate,
        paymentDeadline,
        totalAmount,
        vatAmount
      );
    }
  });
}
export const getAllInvoices = () => {
  return db
    .prepare(`
    SELECT invoices.*, issuers.name AS issuer_name, issuers.address AS issuer_address, issuers.tax_number AS issuer_tax_number,
           buyers.name AS buyer_name, buyers.address AS buyer_address, buyers.tax_number AS buyer_tax_number
    FROM invoices
    JOIN issuers ON invoices.issuer_id = issuers.id
    JOIN buyers ON invoices.buyer_id = buyers.id
  `)
    .all();
};

export const getInvoiceById = (id) => {
  return db
    .prepare(`
    SELECT invoices.*, issuers.name AS issuer_name, issuers.address AS issuer_address, issuers.tax_number AS issuer_tax_number,
           buyers.name AS buyer_name, buyers.address AS buyer_address, buyers.tax_number AS buyer_tax_number
    FROM invoices
    JOIN issuers ON invoices.issuer_id = issuers.id
    JOIN buyers ON invoices.buyer_id = buyers.id
    WHERE invoices.id = ?
  `)
    .get(id);
};

export const createInvoice = (data) => {
  const {
    issuer_id,
    buyer_id,
    invoice_number,
    invoice_date,
    completion_date,
    payment_deadline,
    total_amount,
    vat_amount,
  } = data;
  if (
    !issuer_id ||
    !buyer_id ||
    !invoice_number ||
    !invoice_date ||
    !completion_date ||
    !payment_deadline ||
    !total_amount ||
    !vat_amount
  ) {
    throw new Error("Missing required invoice fields");
  }
  const stmt = db.prepare(
    `INSERT INTO invoices (issuer_id, buyer_id, invoice_number, invoice_date, completion_date, payment_deadline, total_amount, vat_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(
    issuer_id,
    buyer_id,
    invoice_number,
    invoice_date,
    completion_date,
    payment_deadline,
    total_amount,
    vat_amount
  );
  return getInvoiceById(info.lastInsertRowid);
};

export const updateInvoice = (id, data) => {
  // Prevent updating invoice if it is canceled
  const invoice = getInvoiceById(id);
  if (invoice.canceled) {
    throw new Error("Cannot modify a canceled invoice");
  }

  const {
    issuer_id,
    buyer_id,
    invoice_number,
    invoice_date,
    completion_date,
    payment_deadline,
    total_amount,
    vat_amount,
  } = data;
  const stmt = db.prepare(
    `
    UPDATE invoices SET
      issuer_id = ?,
      buyer_id = ?,
      invoice_number = ?,
      invoice_date = ?,
      completion_date = ?,
      payment_deadline = ?,
      total_amount = ?,
      vat_amount = ?
    WHERE id = ?
  `
  );
  const info = stmt.run(
    issuer_id,
    buyer_id,
    invoice_number,
    invoice_date,
    completion_date,
    payment_deadline,
    total_amount,
    vat_amount,
    id
  );
  if (info.changes === 0) return null;
  return getInvoiceById(id);
};

export const deleteInvoice = (id) => {
  const stmt = db.prepare("DELETE FROM invoices WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
};

export const getAllBuyers = () => {
  return db.prepare("SELECT * FROM buyers").all();
};

export const cancelInvoice = (id) => {
  const stmt = db.prepare("UPDATE invoices SET canceled = 1 WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
};

export default db;

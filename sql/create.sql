CREATE TABLE jobs(
  job_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  quote REAL NOT NULL,
  completion_date DATE NOT NULL
);

CREATE TABLE job_materials(
  id INTEGER PRIMARY KEY,
  job_id INTEGER,
  material_id INTEGER,
  quantity INTEGER
);

CREATE TABLE materials(
  material_id INTEGER PRIMARY KEY,
  supplier TEXT NOT NULL,
  cost REAL NOT NULL,
  description TEXT NOT NULL,
  stock INTEGER NOT NULL
);

CREATE TABLE customers(
  customer_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT NOT NULL,
  postcode TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL
);
# 📚 Quotes API

A simple RESTful API to serve categorized quotes with features like listing, filtering by category, retrieving individual quotes by ID, and keyword search.

---

## 🚀 Getting Started

### Prerequisites

* Node.js installed (v14+ recommended)
* npm or yarn
* `categorizedQuotes.json` file in the root directory

### Installation

```bash
git clone https://github.com/MthoNtanzi/quotes-api.git
cd quotes-api
npm install
```

### Run the Server

```bash
node server.js
```

The API will run at:

```
http://localhost:4000
```

You can also set a custom port using the `PORT` environment variable.

---

## 📂 File Structure

```
.
├── categorizedQuotes.json   # Quote data file (grouped by category)
├── server.js                # Main Express server
└── README.md                # API documentation
```

---

## 📌 Endpoints

### 1. Get All Quotes (Grouped by Category)

**GET** `/api/quotes`

**Response:**

```json
{
  "funny": [ { "id": 1, "quote": "...", "person": "..." }, ... ],
  "motivational": [ ... ],
  "change": [ ... ],
  ...
}
```

---

### 2. Get Quotes by Category

**GET** `/api/quotes/:category`

| Category Options |
| ---------------- |
| funny            |
| motivational     |
| change           |
| love             |
| time             |
| education        |
| truth            |
| life             |

**Example:**

```
GET /api/quotes/funny
```

**Response:**

```json
[
  {
    "id": 1,
    "quote": "When life gives you lemons...",
    "person": "Cathy Guiswite"
  },
  ...
]
```

If the category is not found:

```json
{
  "error": "Category not found"
}
```

---

### 3. Get Quote by ID (Search Across All Categories)

**GET** `/api/quote/:id`

**Example:**

```
GET /api/quote/25
```

**Response:**

```json
{
  "id": 25,
  "quote": "Some quote text...",
  "person": "Someone Famous",
  "category": "change"
}
```

If ID is not found:

```json
{
  "error": "Quote not found"
}
```

---

### 4. Search Quotes by Text or Author

**GET** `/api/search?q=keyword`

**Query Parameters:**

* `q`: A keyword to search in the `quote` text or `person` name.

**Example:**

```
GET /api/search?q=maya
```

**Response:**

```json
[
  {
    "id": 67,
    "quote": "Love is like a virus. It can happen to anybody at any time.",
    "person": "Maya Angelou",
    "category": "love"
  },
  ...
]
```

If no match is found:

```json
{
  "message": "No quotes found"
}
```

If query is missing:

```json
{
  "error": "Missing search query (?q=)"
}
```

---

## 🌍 Deployment

To deploy to services like **Render**, **Railway**, **Vercel (serverless)**, or **Heroku**, make sure to:

* Add your `categorizedQuotes.json` file
* Bind the port to `process.env.PORT`
* Update the `start` script in `package.json`:

```json
"scripts": {
  "start": "node server.js"
}
```

---

## 🛠 Future Features

* Add new quotes via POST request
* Edit/delete quotes (Admin endpoints)
* Paginate responses
* Rate quotes or mark favorites

---

## 🤝 Contribution

Feel free to fork, open issues, or submit PRs to improve the API!

---

## 📄 License

MIT

---

## ✨ Author

Made with ❤️ by Mthobisi Ntanzi

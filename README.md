# Infy-Swed Demo — Angular Role-Based Authentication

**Live demo:** https://infy-swed-demo.onrender.com  
**GitHub Repo:** https://github.com/mayuri-vaddempudi/infy-swed-demo  

---

## 🌟 What this app is

This is a simple **Angular + Node/Express** demo built for self tasks.  
It shows how a user can log in with email & password, get a **JWT token**, and then see different **dashboards and forms** depending on their role:

- **Admin**
- **Manager**
- **Agent**
- **Customer**

Each role has its **own dashboard widgets + its own form validations**.  
Forms submit into a small grid where you can **filter and sort**.  
The app works on **desktop and mobile** (responsive).

---

## 🧪 Try Me Accounts

👉 Use password: **123456** for all accounts.

| Role     | Email              | What you’ll see                                |
|----------|--------------------|-----------------------------------------------|
| Admin    | alice@admin.com    | Admin dashboard + Admin form                  |
| Manager  | bob@manager.com    | Manager dashboard + Manager form              |
| Agent    | amy@agent.com      | Agent dashboard + Agent form                  |
| Customer | carl@demo.com      | Customer dashboard + Customer form            |

> The role is decided from the **email domain**.  
> `@admin.com` → Admin, `@manager.com` → Manager, `@agent.com` → Agent, everything else = Customer.

---

## 🧱 Requirements

- Node.js **18 or later**
- npm (comes with Node)

Install dependencies:

```bash
npm install


---

## ▶️ Running in Development

There are two options:

### Option A — Angular + API together (recommended)

```bash
npm run dev
```

This runs both:

- Backend API → http://localhost:4000  
- Angular app → http://localhost:4200 (opens automatically)  

Angular proxies `/api/*` to the backend using **proxy.conf.json**.

---

### Option B — Angular only

```bash
npm start   # same as: ng serve
```

⚠️ Without the backend (`server.js`) running, **login and verify will fail**.  
This option is only good if you’re working on **UI screens only**.

---

## 🏭 Running in Production (Locally)

1. Build the Angular app:

```bash
npm run build
```

2. Run the Express server in production mode:

```bash
npm run serve:prod
```

3. Open http://localhost:4000

In this mode:

- Express serves the **Angular dist** folder (for SPA routes like `/dashboard`)  
- Express also exposes the **API endpoints** under `/api`

---

## ☁️ Deployment on Render

The app is deployed here: https://infy-swed-demo.onrender.com

Render settings:

- **Build Command:** `npm ci && npm run build`  
- **Start Command:** `node server.js`  
- **Port:** Render provides `PORT` automatically, and `server.js` uses it.

---

## 🔐 How Login/Auth Works

1. User logs in with email + password.  
2. Backend checks credentials, decides role from email, returns a **JWT**.  
3. Angular stores `{ token, email, role }`.  
4. For every `/api/*` call, Angular’s interceptor adds `Authorization: Bearer <token>`.  
5. **Auth Guard** protects routes; if no valid token → redirect to `/login`.  
6. Dashboards and forms change depending on the role.
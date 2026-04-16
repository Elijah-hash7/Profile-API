# Profile API

✨ **Live Deployment:** [profile-api.up.railway.app](https://profile-api.up.railway.app/api/profiles)

A fast, fully-typed backend service that takes a name, enriches it with data from three separate external APIs simultaneously, and stores the normalized profile perfectly in MongoDB. 

Built with modern backend architecture practices including full Separation of Concerns.

## 🚀 Features
- **Concurrent Fetching:** Uses `Promise.all()` to hit Genderize, Agify, and Nationalize APIs at the exact same time to save external processing time.
- **Idempotency:** Strict duplicate handling! If an API request is made for a name that already exists, it instantly bounces the request at the Repository layer and returns the cached Database version to save money and processing power.
- **Data Normalization:** Enforces strictly lowercased names throughout the Service and Database schema.
- **UUID v7 Implementation:** Overrides standard MongoDB ObjectIds to strictly enforce UUIDv7 identifiers.
- **Advanced Filtering:** Use a single endpoint to fetch all profiles, or add custom case-insensitive search queries using MongoDB Regex matching.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js 
- **Language:** TypeScript 
- **Database:** MongoDB & Mongoose
- **Security:** CORS & dotenv

## 📂 Project Structure (Layered Architecture)
- `routes/` — The Receptionist. Looks at the incoming HTTP request and passes it to the correct controller.
- `controllers/` — The Manager. Validates the incoming Request, throws 400/422 Errors if invalid, and handles the HTTP Response formatting.
- `services/` — The Brain (Business Logic). Knows nothing about databases or HTTP. Only calculates age brackets, picks the best probability country, and formats the external API data.
- `repositories/` & `models/` — The File Clerk. The absolute only layer allowed to talk to MongoDB. Enforces idempotency and rules.

## ⚙️ Testing Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   Create a `.env` file in the root directory and add a local or cloud MongoDB URL:
   ```env
   MONGO_URI=mongodb+srv://<user>:<password>@cluster...
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```
   *Note: If the server instantly crashes, double check your Mongo URL! We implement "Fail Fast" so the app refuses to run blindly without a database.*

## 🛣️ Endpoints available: 
- `POST /api/profiles` - Create & enrich a profile (Body: `{"name": "elijah"}`)
- `GET /api/profiles` - List all profiles
- `GET /api/profiles?gender=male&age_group=adult` - Sub-search profiles
- `GET /api/profiles/:id` - Fetch single profile
- `DELETE /api/profiles/:id` - Delete profile (Returns 204 No Content)

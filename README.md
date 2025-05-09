# Apollo 24/7 Clone Backend

This is the backend for the Apollo 24/7 destination page clone, built with TypeScript, Express, Prisma ORM, and PostgreSQL.

## Setup Instructions

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure database**:
   Update the `.env` file with your PostgreSQL connection string from Neon.tech:

   ```
   DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<db-name>?sslmode=require"
   ```

3. **Generate Prisma client and run migrations**:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Add a Doctor

- **URL**: `/api/add-doctor`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Dr. John Doe",
    "specialty": "Cardiologist",
    "gender": "male",
    "experience": 10,
    "rating": 4.5
  }
  ```

### List Doctors with Filters

- **URL**: `/api/list-doctor-with-filter`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional, default: 1): Page number
  - `limit` (optional, default: 10): Results per page
  - `gender` (optional): Filter by gender
  - `specialty` (optional): Filter by specialty
  - `experience` (optional): Filter by years of experience

## Build for Production

```bash
npm run build
npm start
```

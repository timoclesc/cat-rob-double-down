# Local PostgreSQL Database Setup for Development

This project uses Docker to run a local PostgreSQL database for development purposes.

## Getting Started

1. **Start the database:**

   ```sh
   docker compose up -d
   ```

   This will start a PostgreSQL 15 database on port 5432 with the following credentials:
   - **User:** postgres
   - **Password:** postgres
   - **Database:** ultra_marathon_dev

2. **Stop the database:**

   ```sh
   docker compose down
   ```

3. **Data Persistence:**

   The database data is stored in a Docker volume (`postgres_data`) and will persist between container restarts.

## Connection String Example

Use the following connection string in your local environment:

```
postgres://postgres:postgres@localhost:5432/ultra_marathon_dev
```

You can set this as an environment variable, e.g. in your `.env.local` file:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ultra_marathon_dev
```

---

For more information, see the [PostgreSQL Docker documentation](https://hub.docker.com/_/postgres).

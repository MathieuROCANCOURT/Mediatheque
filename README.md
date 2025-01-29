# CD library

## Objective

Create a CD library web application where users can borrow CDs and return them to the library.
The administrator can add or remove CDs from the library and view all loaned CDs and their owners.

## Tools

* Laravel V11
* [MailPit](https://github.com/axllent/mailpit)

## Database diagram for CDs

![diagram_SQL.png](docs/diagram_SQL.png)

## Commands lines

Install PHP dependencies:

```bash
composer install
```

Install NPM dependencies:

```bash
npm install
```

Build assets:

```bash
npm run dev
```

Setup configuration:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration
accordingly.

```bash
touch database/database.sqlite
```

Run database migrations:

```bash
php artisan migrate
```

Run database seeder:

```bash
php artisan db:seed
```

Run artisan server:

```bash
php artisan serve
```

After launch artisan server, view app with link: http://localhost:8000/

### Account avalaible

| Privileged    | Mail              | Password     |
|---------------|-------------------|--------------|
| Administrator | admin@example.com | password     |
| User          | user@example.com  | password     |

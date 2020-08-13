# Vercer Take Home Technical Challenge

## Setup

- Run `npm install` / `yarn install`
- Run `npm run start-dummy-api` / `yarn start-dummy-api`

This will run an http server with a single endpoint `http://localhost:3000/trades`. This is a dataset representing buying and selling of products, typically oil, gas, etc.

## Step 1 - Display Trades in a filterable list

Build a React app that displays trade data in a list with filters for `product_name`, `broker` and `side` (`buy`/`sell` toggle).

It’s also important to be able to filter by the total price of the of the trades (`trade_price`)

You'll need to fetch the trade data from the endpoint then render each of the "trade objects" in the list.

Here are the fields we want to be displayed from each "trade object":

- `book_name`
- `cancelled`
- `end_date`
- `matched`
- `product_name`
- `side`
- `start_date`
- `time_created`
- `trade_date`
- `trade_display_volume` (rounded to the nearest integer)
- `trade_price` (rounded to 2 decimal places)

## Step 2 - Display total and average for visible trades

In a fixed section above the list, display the total and average of the filtered "trade object"s `trade_price` fields. These values should be rounded to 3 decimal places after the calculations have been performed.

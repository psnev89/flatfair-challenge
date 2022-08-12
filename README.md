# Flatfair Challenge

## Table of Contents

- [Install](#install)
- [Usage](#usage)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com).

```sh
$ npm install
```

## Usage

To run tests:

```sh
$ npm run test
```

To compile and run app:

```sh
$ npm run start
# it will compile to dist/ folder
```

## Business rules

| BR    | Description                                                                                |
|-------|--------------------------------------------------------------------------------------------|
| BR1   | rent amount should be between 1 - int.max                                                  |
| BR2   | rent period should be one of ["month", "week"]                                             |
| BR3   | calculate membership fee function should throw or return error when rent amount is invalid |
| BR3.1 | allowed rent amount for week rent period should be [25£ ~ 2000£]                           |
| BR3.2 | allowed rent amount for month rent period should be [110£ ~ 8660£]                         |
| BR4   | monetary amounts are stored in pence                                                       |

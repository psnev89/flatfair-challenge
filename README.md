# Flatfair Challenge

Tried to step out of my confort zone and attemped to complete this challenge using __TypeScript__. 

Checking the Organisation Structure, quickly noticed that the best way to represent it was by using the __Composite Design Pattern__, with the Branch being the __Leaf__ node and the other types (Area and Division) being a __Composite__ node. Decided to split into different classes for SOC and scalability reasons.

[Organisation Unit diagram](docs/OrganisationUnit.png)

As the main goal was to implement the _**calculateMembershipFee**_ function, I implemented it on the index file. On a "real" app, I would have implemented it on a _domain_ layer, along with the validations, and have separate layers for _data_ and _UI_ (multi-repo maybe?).


## Considerations for future iterations

1. Validate invalid Membership fees (negative or NaN).
2. Mock organisation data and add _calculateMembershipFee_ function tests.
3. Move main function to a domain related folder along with the validations.
4. Add simple UI to allow user interaction.
5. Add the Client Organisation Unit (didn't add as it was not referred as an Organisation Unit in the challenge).


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

To compile and run an example:

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


_PS: sorry for my english, I'm really looking forward to improve it!_ 
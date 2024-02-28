# Prometheus Webapp

## Visit the application at https://frontend.prometheus-backend.top (unfortunate domain name, I know...)

## Associated Backend: https://gitfront.io/r/tom-blk/XivoMxcDC6rw/reciprocal-services-backend/

## Purpose

The main purpose of this app is to serve as a practice/portfolio project, because I wanted to do something different than an Instagram clone.

## Idea
The idea behind this project was that it might be a good idea to split economic goods and services into two classes, one being centralized and focused on trading non-essential goods and services (regular economy) and one being decentralized, where people separated by their location (in this case postal code) can have their own 'trading clusters' where they can provide essential goods and services (local food etc.) to each other locally. This would improve the stability, ecology and health implications of the economy.

## Problems
Without using digital methods of identification it is extremely hard to provide currency to the users of the system to enable them to start trading with one another because granting them a certain amount of currency when creating their account would just incentivize them to create more accounts when they run out. There could be reward based protocols in place to incentivize the users to legitimize each others transactions in exchange for a small currency reward (this is possible because the users are all in the same location), but it would likely be too tedious of a process for most people so the user base would be rather small. A possible 'soft fix' could be to require mobile number verification, which would make it harder, but of course not impossible to commit fraud on the platform. The expectation behind this approach would be that the economic incentives to commit fraud in a local community aren't high enough to commit to the the constant requirement of new phone numbers and the risk of being found out if using new accounts regularly. And of course the problem of digital currency and the inconvenience of their use is also a problem. At the moment currency and the transaction of it only exists on the database, but if this were to be a real application, more security and of course immutability would be required. To achieve that, while maintaining the maximum amount of convenience for the user, one could implement a layer 2 cryptocurrency on the Mina Protocol (https://minaprotocol.com) as it would allow users to participate in the network from their smartphone instead of needing large amounts of space (and possibly computational power) on their computers.

## Status of development

The application is functional, but not applicable to the real world yet, due to the problems described in the Problems section. As of this moment there is no email verification, so new users can type in whatever they want as long as it contains an '@'. Upon account creation new users are awarded with 100 'Embers', the currency used on the application.
  
## Additional features to implement besides the ones mentioned before

- user feedback (users can check boxes while rating provider that are predefined positives/negatives to justify rating)
- instant messaging service to let corresponding users communicate in real time without switching to other applications

---------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


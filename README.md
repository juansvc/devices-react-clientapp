# Devices

## Overview

A React Frontend web application to work with devices.

## Technologies Used

- [React JS](https://reactjs.org/)
- [Axios](https://github.com/axios/axios) fetching API data
- [Material UI](https://material-ui.com/) icons and UI elements
- [Jest](https://jestjs.io/) testing
- [Prettier](https://prettier.io/) formatting the project's code

## Process

I started off using `create-react-app` to build out the framework for the CRUD functionality, before implementing filters and more customization. I decided to use a table to display the devices data, since it was easier and more intuitive for users to have column sorting. I decided to focus on using React hooks instead of Redux for managing state. I added tests once the basic structure was in placed and worked on improving the application's UI.

## Installation

- `git clone` this repo
- `npm i` to install dependencies
- `npm run dev` and `y` to run frontend app

If you include changes, use `npm run format` for prettier

## JFYI

- I used a search input instead of using dropdown for user can filter devices by one Type, because I think it is more functional in terms of ux and user friendliness.
- I used a button in table instead of using dropdown for user can sort devices by system name and HDD Capacity, because I think it is more functional in terms of ux and user friendliness. 

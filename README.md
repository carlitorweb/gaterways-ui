# Gaterways

REST service for storing and share information about Gaterways

## Tech Stack

**Client:** React, ViteJS, TailwindCSS, Typescript

**Server:** Node, Express, ORM PrimaJS, MongoDB Atlas, Typescript

## Requirements tasks completed

-   [x] Create and Store the information of a Gaterway
-   [x] Create and Store information of a Peripheral Device
-   [x] Add a Peripheral Device to a Gaterway
-   [x] Delete a Gaterway from the database
-   [x] Validate the IPv4 field before store a Gaterway.
-   [x] Show a error message to the user in case of a wrong IPv4.
-   [x] Display information about all Gaterway stored
-   [x] Display the amount of Peripheral Device each Gaterway stored have
-   [x] Display the amount of Peripheral Device each Gaterway stored have
-   [x] Provide a UI for the app

## Requirements tasks not completed due time

-   [ ] Display information about all Peripheral Device stored
-   [ ] Check a Gaterway not have more than 10 Peripheral Device before add a new one to him
-   [ ] Delete one or more Peripheral Device from a Gaterway
-   [ ] Meaningful Unit tests (Jest was the choosen tool)
-   [ ] An automated build

## Installation

**Note:** Need the gaterway-server running first

Now go to gaterways-ui folder and run:

```bash
  npm install
```

When all dependency are installed, run the follow command:

```bash
  npm run dev
```

The application UI will launch
![preview](https://user-images.githubusercontent.com/3956472/201934843-c018d162-cfec-4f9a-90f8-23d243a58987.PNG)

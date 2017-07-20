### Techery test app

Demo [here](https://psakalo.github.io/techery_app/)

There can be some problems with navigation in demo, because of app deployed not to the root. Locally everything is ok.

To launch locally
```sh
npm start
```

Unfortunately, im not yet familiar with TypeScript, so didn't use it. If it's absolutely required, i will get a touch on it.
С TypeScript к сожалению не знаком, по этому не стал пока его трогать. Если это совсем обязательно, разберусь, перепишу.

I started writing tests, but 3 days elapsed, so i stopped at this coverage:

File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
All files           |    75.44 |       50 |     64.1 |    77.06 |                |
 src                |       80 |      100 |    57.14 |       80 |                |
  App.js            |    71.43 |      100 |    33.33 |    71.43 |          31,38 |
  testsSetup.js     |     87.5 |      100 |       75 |     87.5 |             14 |
 src/components     |    65.45 |     37.5 |    52.63 |    69.23 |                |
  FavouritesPage.js |       70 |      100 |       50 |    77.78 |          26,32 |
  Photo.js          |      100 |       50 |      100 |      100 |             26 |
  PhotosDisplay.js  |    46.43 |    33.33 |    16.67 |       50 |... 82,83,84,86 |
  PhotosPage.js     |     87.5 |      100 |       80 |     87.5 |             29 |
  TopPanel.js       |      100 |       50 |      100 |      100 |             49 |
 src/redux          |       80 |       50 |       50 |       80 |                |
  configureStore.js |       80 |       50 |       50 |       80 |             24 |
 src/redux/modules  |    87.18 |    64.29 |    90.91 |    86.49 |                |
  favourites.js     |    95.24 |     87.5 |      100 |       95 |             45 |
  photos.js         |    77.78 |    33.33 |    83.33 |    76.47 |    23,29,38,59 |

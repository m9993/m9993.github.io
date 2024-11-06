
# Product Order

A react-native shopping app for test purpose.

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 50px; justify-content: center">
    <img
    alt="Splash"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/splash.png?raw=true" />
    <img
    alt="Home"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/home.png?raw=true" />
    <img
    alt="Offline Mode"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/offline-mode.png?raw=true" />
    <img
    alt="Cart"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/cart.png?raw=true" />
    <img
    alt="Product Details"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/product-details.png?raw=true" />
    <img
    alt="Current Location"
    style="width: 200px; border: 4px solid black; border-radius: 8px"
    src="https://github.com/m9993/techno-next-test-product-order-app/blob/main/readme-images/current-location.png?raw=true" />
</div>


## Features

- Showing current location on map
- Proper data caching in api call
- Product list view in both online and offline mode (from local storage)
- Handling of network changes and data syncing when the user comes back online
- Product sorting
- Product details screen
- Cart (add to cart, increase quantity | quantity reduce, remove from cart)
- After every 20 seconds, a function will be executed and return the current timestamp in the home screen in a fixed floated position
- Animated splash screen


## Run Locally

Clone the project

```bash
  git clone https://github.com/m9993/techno-next-test-product-order-app.git
```

Go to the project directory

```bash
  cd techno-next-test-product-order-app
```
### API Key
Note: Google maps api keys (android & iOS) have not included as it is not required in development test. If you need production build then please make sure to add this in app.json file in root folder.

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

After running Metro Bundler
- If you are usuing android emulator then press a (open Android) to run the app.
- Or if you are usuing physical device then download Expo Go app, then scan the QR code to run the app.


# UICompanion

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t UICompanion .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> UICompanion
```

## License

[ISC](LICENSE) © 2023 Benedikt Geisberger

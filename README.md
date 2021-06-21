# CDC Order Source

This simulator publishes simple via MQTT on an interval.

# Table of contents

- [Getting started](#getting-started)
- [Topic structure](#topic-structure)
- [Payload structure](#payload-structure)

# Getting started

Follow the instructions in [.EDIT-ME.env](.EDIT-ME.env) and then run:

```
git clone https://github.com/solacese/cdc-order-source.git
cd cdc-order-source
docker build . -t cdc-order-source
docker run cdc-order-source
```

# Topic structure

`retailco/order/create/v1/{Channel}/{OrderType}`

# Payload structure

[schema.json](schema.json) is the JSON schema for the order event this simulator publishes.

```
{
  id,
  type,
  channel,
  totalPrice,
  timestamp
}
```

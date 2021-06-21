/**
 * order-simulator.js
 * @author Andrew Roberts
 */

import produce from "immer";
import faker from "faker";
import { orderChannels, orderTypes } from "./data";

export function createOrderSimulator(publish, intervalMs) {
  let intervalId;
  let orderNumber = 0;

  function start() {
    intervalId = setInterval(() => {
      let mockOrderPlacedEvent = generateMockOrderEvent(getCurrentOrderNumber());
      publish(mockOrderPlacedEvent.topic, mockOrderPlacedEvent.payload, { qos: 1 });
      incrementOrderNumber();
    }, intervalMs);
  }

  function stop() {
    clearInterval(intervalId);
  }

  function getCurrentOrderNumber() {
    return orderNumber;
  }

  function incrementOrderNumber() {
    orderNumber++;
  }

  return produce({}, (draft) => {
    draft.start = start;
    draft.stop = stop;
  });
}

function generateMockOrderEvent(orderNumber) {
  let id = orderNumber;
  let type = orderTypes[faker.datatype.number(orderTypes.length - 1)];
  let channel = orderChannels[faker.datatype.number(orderChannels.length - 1)];
  let totalPrice = faker.finance.amount();
  let timestamp = Date();

  return {
    // retailco/order/create/v1/{Channel}/{OrderType}
    topic: `retailco/order/create/v1/${channel}/${type}`,
    payload: {
      id,
      type,
      channel,
      totalPrice,
      timestamp,
    },
  };
}

type MessageType = 'orderCreated' | 'orderCancelled';

interface Message {
  type: MessageType;
}

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

type AllMessages = OrderCreatedMessage | OrderCancelledMessage;

type Subscriber<T extends Message> = (message: T) => void;

export class MessageBus {
  private subscribers: {
    [K in MessageType]?: Subscriber<Extract<AllMessages, { type: K }>>[];
  } = {};

  subscribe<K extends AllMessages['type']>(
    type: K,
    subscriber: (message: Extract<AllMessages, { type: K }>) => void,
  ): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type]!.push(subscriber);
  }

  publish<T extends AllMessages>(message: T): void {
    const subs = this.subscribers[message.type] as
      | Subscriber<T>[]
      | undefined;
    subs?.forEach((fn) => fn(message));
  }
}

export class InventoryStockTracker {
  private orders = new Map<string, { productId: string; quantity: number }[]>();

  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe('orderCreated', (message) => {
      this.orders.set(message.payload.orderId, message.payload.items);
      for (const item of message.payload.items) {
        this.stock[item.productId] = (this.stock[item.productId] || 0) - item.quantity;
      }
    });

    this.bus.subscribe('orderCancelled', (message) => {
      const items = this.orders.get(message.payload.orderId);
      if (!items) return;

      for (const item of items) {
        this.stock[item.productId] = (this.stock[item.productId] || 0) + item.quantity;
      }

      this.orders.delete(message.payload.orderId);
    });
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
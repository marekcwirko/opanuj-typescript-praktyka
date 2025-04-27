/* Mamy system obsługujący różne typy powiadomień. Każde powiadomienie ma wspólne
pole 'type', ale różne pozostałe pola.

Obecna implementacja używa prostego type guard, który nie wykorzystuje pełni możliwości TypeScriptu.

Twoim zadaniem jest:
  1. Dodaj nowy typ powiadomienia: 'SystemNotification' z polem 'log: string'.
  2. Rozbuduj funkcję getNotificationText tak, aby zwracała odpowiedni tekst dla każdego typu powiadomienia.
  3. Zabezpiecz funkcję getNotificationText przed niewłaściwym typem powiadomienia, zwracając "Unknown notification"
*/

type EmailNotification = {
  type: 'email';
  emailAddress: string;
  content: string;
};

type SMSNotification = {
  type: 'sms';
  phoneNumber: number;
  message: string;
};

type SystemNotification = { type: '' };

type Notification = EmailNotification | SMSNotification | SystemNotification;

type KnownNotification = Notification & { type: Notification['type'] };

// ❌ Ta funkcja wymaga poprawy:
export function getNotificationText(notification: any): string {
  if (typeof notification !== 'object' || !notification.type) {
    return 'Unknown notification';
  }

  switch (notification.type) {
    case 'email':
      if ('content' in notification) {
        return notification.content;
      }
      break;
    case 'sms':
      if ('message' in notification) {
        return notification.message;
      }
      break;
    case 'system':
      if ('log' in notification) {
        return notification.log;
      }
      break;
  }

  return 'Unknown notification';
}


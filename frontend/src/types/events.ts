export type NotificationEventPayload = {
    message: string;
    action: (() => void) | null;
}
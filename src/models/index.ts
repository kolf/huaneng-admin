/** user's device */
enum DeviceList {
  /** telephone */
  MOBILE = 'MOBILE',
  /** computer */
  DESKTOP = 'DESKTOP'
}

export type Device = keyof typeof DeviceList;

export function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
}


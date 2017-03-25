/**
 * Created by jevgenir on 3/25/2017.
 */
export const IS_SUBSCRIBE_DIALOG_CLOSED = "IS_SUBSCRIBE_DIALOG_CLOSED";

export default function onHandleDialogClose() {
  return {
    type: IS_SUBSCRIBE_DIALOG_CLOSED,
    isSubscribed: false
  }
}

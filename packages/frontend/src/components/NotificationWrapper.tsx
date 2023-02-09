import React, { Fragment } from "react";
import {
  selectNotification,
  showNotification,
} from "../store/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../store";
import CustomizedSnackbar from "../components/CustomizedSnackbar";

export function NotificationWrapper({ children }: React.PropsWithChildren<{}>) {
  const dispatch = useDispatch<AppDispatch>();
  const notification = useSelector(selectNotification);

  const clearSnackBar = () => {
    dispatch(
      showNotification({
        message: "",
        type: "success",
      })
    );
  };

  return (
    <Fragment>
      <CustomizedSnackbar
        open={Boolean(notification.message)}
        type={notification.type}
        message={notification.message}
        closeCallback={clearSnackBar}
      />
      {children}
    </Fragment>
  );
}

'use client'
import { alertTypeValue } from "../../constant/DiceType";
import { Alert, AlertTitle } from "@mui/material";

interface PopUpAlertProps {
    alertMessage: string | null,
    alertType: alertTypeValue.success | alertTypeValue.error | alertTypeValue.info
}

export default function PopUpAlert({alertMessage, alertType}: PopUpAlertProps) {
    return (
        <>
            {alertMessage  && (
                <Alert variant="filled" severity={alertType} sx={{ mt: 2, position: "absolute", top: 20, width: 600 }}>
                {alertType === "error" && (
                    <AlertTitle>You lost!</AlertTitle>
                )}
                {alertMessage}
            </Alert>)}
        </>
    )
}
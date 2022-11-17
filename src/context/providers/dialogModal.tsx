import { ReactNode, useState } from 'react';
import { inititalDialogData } from '../../appTypes';
import NotificationDialog from '../../helpers/dialog';
import DialogModalContext from '../DialogModal';

interface Props {
    children: ReactNode;
}

/**
 * @description A context for show a dialog modal notification to the user with
 * a message with a succeful or fail operation. In case of a fail, the user get
 * enough information about it inside this modal.
 *
 * @param children ReactNode
 */
export const DialogModalProvider = ({ children }: Props) => {
    // Better handle separate the Open/Close state, in this way I can update
    // the data of the Dialog, and Open/Close it exactly when I need
    const [showDialog, setShowDialog] = useState(false);

    // The data the dialog will have each time is called
    const [dialogData, setDialogData] = useState(inititalDialogData.dialogData);

    return (
        <DialogModalContext.Provider
            value={{ showDialog, setShowDialog, dialogData, setDialogData }}>
            {children}

            {/* Render the component one time. We will just update
            the content of the component while we Close/Open it */}
            <NotificationDialog
                open={showDialog}
                title={dialogData.title}
                description={dialogData.description}
                isError={dialogData.isError}
                closeDialog={setShowDialog}
            />
        </DialogModalContext.Provider>
    );
};

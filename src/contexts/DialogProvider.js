import PropTypes from "prop-types";
import { useState, createContext } from "react";

const DialogContext = createContext({});

const defaultState = { open: false, data: null, name: null };

function DialogProvider({ children }) {
  const [dialog, setDialog] = useState(defaultState);
  const handleClose = () => setDialog(defaultState);
  const openDialog = (values) => setDialog({ ...dialog, ...values });

  return (
    <DialogContext.Provider
      value={{
        handleClose,
        openDialog,
        open: dialog.open,
        data: dialog.data,
        name: dialog.name,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DialogProvider, DialogContext };

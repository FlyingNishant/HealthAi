import { TextField } from '@mui/material';
import React, { useId } from 'react'

function Input({
    label,
    type="text",
    variant="standard",
    className="",
    showError,
    errorText,
    ...prop
}, ref) {
    const id = useId();
  return (
    <div className={`w-full ${className}`}>
        <TextField
            error={showError}
            label={label}
            helperText={errorText}
            variant={variant}
            type={type}
            className={`w-full`}
            ref={ref}
            id={id}
            {...prop}
        />
    </div>
  )
}

export default React.forwardRef(Input);
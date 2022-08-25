import { TextField, Box } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function ControlledMuiTextfield({
  name,
  label,
  control,
  children,
  rows = 1,
  rules = {},
  InputLabelProps = {},
  InputProps = {},
  inputProps = {},
  sx = {},
  size = null,
  error = null,
  onKeyPress = null,
  defaultValue = "",
  disabled = false,
  required = false,
  fullWidth = false,
  autoFocus = false,
  type = "text",
  select = false,
  onFocus = null,
}) {
  return (
    <Box sx={{ ...sx }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <TextField
            onKeyPress={onKeyPress}
            autoFocus={autoFocus}
            size={size}
            select={select}
            onFocus={onFocus}
            value={value}
            onChange={(e) =>
              onChange(
                type === "number" ? Number(e.target.value) : e.target.value
              )
            }
            variant="outlined"
            disabled={disabled}
            label={label}
            type={type}
            multiline={rows > 1}
            rows={rows}
            fullWidth={fullWidth}
            required={required}
            error={!!error}
            helperText={error && error.message}
            inputProps={{
              autoCapitalize: "none",
              ...inputProps,
            }}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
          >
            {children}
          </TextField>
        )}
      />
    </Box>
  );
}

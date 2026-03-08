import TextField from "@mui/material/TextField";

const AppInput = ({ label, value, onChange, type = "text", error, helperText, fullWidth = true, required, name, autoComplete }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    type={type}
    error={!!error}
    helperText={helperText}
    fullWidth={fullWidth}
    required={required}
    name={name}
    autoComplete={autoComplete}
    variant="outlined"
    size="small"
    sx={{ mb: 2 }}
  />
);

export default AppInput;

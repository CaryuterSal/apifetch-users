import Button from "@mui/material/Button";

const AppButton = ({ children, variant = "contained", color = "primary", onClick, size = "medium", startIcon, disabled, fullWidth, sx }) => (
  <Button
    variant={variant}
    color={color}
    onClick={onClick}
    size={size}
    startIcon={startIcon}
    disabled={disabled}
    fullWidth={fullWidth}
    sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, ...sx }}
  >
    {children}
  </Button>
);

export default AppButton;

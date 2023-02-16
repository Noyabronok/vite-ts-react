import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

export default function Footer() {
  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
      }}
    >
      <Typography align="center">
        Written with love by Alex Feldman
      </Typography>
    </Container>
  );
}

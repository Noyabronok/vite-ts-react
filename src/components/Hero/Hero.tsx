import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Hero() {
  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      sx={{ px: 2, py: 4 }}
    >
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        Search and compare stocks for free!  Awesome!
      </Typography>
    </Container>
  );
}

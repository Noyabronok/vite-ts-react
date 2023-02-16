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
        This awesome app lets you search for and select up to 3 stocks to
        compare.
      </Typography>
    </Container>
  );
}

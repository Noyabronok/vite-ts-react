import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export default function StockPicker() {
  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      sx={{ px: 5, pb: 5 }}
    >
      <Autocomplete
        multiple
        id="tags-filled"
        options={['alex', 'rafa', 'rufus', 'sophie']}
        // defaultValue={['alex', 'whatever']}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Picker"
            placeholder="Pick up to 3 of your favorite stocks to compare!"
          />
        )}
      />
    </Container>
  );
}

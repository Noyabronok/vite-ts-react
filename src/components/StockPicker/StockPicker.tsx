import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export default function StockPicker() {
  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      sx={{ px: { xs: 2, sm: 3, md: 5 }, pb: { xs: 2, sm: 3, md: 5 } }}
    >
      <Autocomplete
        multiple
        id="tags-filled"
        options={["alex", "rafa", "rufus", "sophie"]}
        // defaultValue={['alex', 'whatever']}
        freeSolo // allow any input
        filterSelectedOptions // don't show option if already selected
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

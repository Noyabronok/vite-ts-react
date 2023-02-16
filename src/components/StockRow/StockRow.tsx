import Grid from "@mui/material/Grid";

export default function StockRow({
  left,
  right,
}: {
  left?: undefined | string | JSX.Element & React.ReactNode;
  right?: undefined | string | JSX.Element & React.ReactNode;
}) {
  return (
    <>
      <Grid item xs={6} container justifyContent="flex-end" paddingRight={4}>
        {left}
      </Grid>
      <Grid item xs={6}>
        {right}
      </Grid>
    </>
  );
}

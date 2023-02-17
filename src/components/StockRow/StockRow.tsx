import Grid from "@mui/material/Grid";

type StockRowProps = {
  left?: undefined | string | (JSX.Element & React.ReactNode);
  right?: undefined | string | (JSX.Element & React.ReactNode);
  // All other props
  [x:string]: any;
};

export default function StockRow({ left, right, ...rest }: StockRowProps) {
  return (
    <>
      <Grid item xs={6} container justifyContent="flex-end" paddingRight={4} {...rest}>
        {left}
      </Grid>
      <Grid item xs={6} {...rest}>
        {right}
      </Grid>
    </>
  );
}

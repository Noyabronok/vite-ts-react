import Grid from "@mui/material/Grid";

export interface StockRowProps {
  left?: undefined | string | (JSX.Element & React.ReactNode);
  right?: undefined | string | (JSX.Element & React.ReactNode);
  // All other props
  [x: string]: any;
}

// formats a grid row.  Left is the label, right is the value
export default function StockRow({ left, right, ...rest }: StockRowProps) {
  let label = left;
  let value = right;

  if (typeof left === "string") {
    // @ts-ignore
    value = <span aria-label={label}>{right}</span>;
    label = `${left}:`;
  }

  return (
    <>
      <Grid
        item
        xs={6}
        container
        justifyContent="flex-end"
        paddingRight={4}
        {...rest}
      >
        {label}
      </Grid>
      <Grid item xs={6} {...rest}>
        {value}
      </Grid>
    </>
  );
}

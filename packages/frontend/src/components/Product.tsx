import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { ProductModel } from "../models/ProductModel";

interface Props {
  product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <Grid item xs={12} className="root">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="300" image="/logo192.png" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {/* <FavoriteIcon /> */}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;

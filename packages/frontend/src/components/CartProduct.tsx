import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { CartModel } from "../models/CartModel";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  cartProduct: CartModel;
}

const CartProduct: React.FC<Props> = ({ cartProduct }) => {
  return (
    <Grid item xs={12} className="root">
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={cartProduct.product.productImage}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Name: {cartProduct.product.productName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Category: {cartProduct.product.category}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Price: {Math.ceil(cartProduct.product.price)} $
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CartProduct;

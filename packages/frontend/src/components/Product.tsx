import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductModel } from "../models/ProductModel";

interface Props {
  product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <Grid item xs={12} className="root">
      <Card>
        <CardMedia
          component="img"
          height="300"
          width="350"
          image={product.productImage}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Name: {product.productName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Price: {Math.ceil(product.price)} $
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={product.favorite ? "error" : "disabled"} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;

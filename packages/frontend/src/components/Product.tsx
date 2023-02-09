import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { hideLoader, showLoader } from "../store/loaderReducer";

import AddToCartIcon from "@mui/icons-material/AddShoppingCart";
import { AppDispatch } from "../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductModel } from "../models/ProductModel";
import { RoutePaths } from "../util/enum";
import Shared from "../util/shared";
import { showNotification } from "../store/notificationReducer";
import { useCardProductService } from "../services/cart.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartProductService = useCardProductService();

  const onClickCart = async () => {
    dispatch(showLoader("medium"));
    try {
      await cartProductService.upsertCartProduct({
        quantity: 1,
        purchased: false,
        product: product._id as string,
      });

      dispatch(
        showNotification({
          message: "Product has been added to cart successfully",
          type: "success",
        })
      );
      navigate(RoutePaths.cart);
    } catch (error) {
      if (Shared.isApiError(error)) {
        dispatch(
          showNotification({
            message: error.error,
            type: "error",
          })
        );
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <Grid item xs={12} className="root">
      <Card>
        <CardMedia component="img" height="180" image={product.productImage} />
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {product.productName}
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
            <FavoriteIcon />
          </IconButton>

          <IconButton aria-label="add to cart" onClick={onClickCart}>
            <AddToCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { CartModel, CartModelRequest } from "../models/CartModel";
import { hideLoader, showLoader } from "../store/loaderReducer";

import AddIcon from "@mui/icons-material/Add";
import { AppDispatch } from "../store";
import RemoveIcon from "@mui/icons-material/Remove";
import Shared from "../util/shared";
import { showNotification } from "../store/notificationReducer";
import { useCardProductService } from "../services/cart.service";
import { useDispatch } from "react-redux";

interface Props {
  cartProduct: CartModel;
  saveCartProduct: (cartProduct: CartModel) => void;
}

const CartProduct: React.FC<Props> = ({ cartProduct, saveCartProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartProductService = useCardProductService();

  const updateCartProduct = async (product: CartModelRequest) => {
    dispatch(showLoader("medium"));
    try {
      await cartProductService.upsertCartProduct(product);
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

  const onClickAdd = async () => {
    const updatedProduct = {
      ...cartProduct,
      quantity: cartProduct.quantity + 1,
    };
    await updateCartProduct({
      product: updatedProduct.product._id as string,
      purchased: updatedProduct.purchased,
      quantity: updatedProduct.quantity,
    });

    saveCartProduct(updatedProduct);
  };

  const onClickRemove = async () => {
    if (cartProduct.quantity > 1) {
      const updatedProduct = {
        ...cartProduct,
        quantity: cartProduct.quantity - 1,
      };
      await updateCartProduct({
        product: updatedProduct.product._id as string,
        purchased: updatedProduct.purchased,
        quantity: updatedProduct.quantity,
      });

      saveCartProduct(updatedProduct);
    }
  };

  const onClickBuy = async () => {
    const updatedProduct = {
      ...cartProduct,
      purchased: true,
    };
    await updateCartProduct({
      product: updatedProduct.product._id as string,
      purchased: updatedProduct.purchased,
      quantity: updatedProduct.quantity,
    });

    saveCartProduct(updatedProduct);
  };

  return (
    <Grid item xs={12} className="root">
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={cartProduct.product.productImage}
        />
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {cartProduct.product.productName}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Quantity: {cartProduct.quantity}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Price: {Math.ceil(cartProduct.product.price)} $
          </Typography>
          <Typography variant="body2" color="text.primary">
            Total Price:{" "}
            {cartProduct.quantity * Math.ceil(cartProduct.product.price)} $
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add"
            onClick={onClickAdd}
            disabled={cartProduct.purchased}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            aria-label="remove"
            onClick={onClickRemove}
            disabled={cartProduct.quantity <= 1 || cartProduct.purchased}
          >
            <RemoveIcon />
          </IconButton>

          <Button
            onClick={onClickBuy}
            size="small"
            variant="contained"
            color={cartProduct.purchased ? "secondary" : "primary"}
            disabled={cartProduct.purchased}
          >
            {cartProduct.purchased ? "Purchased" : "Buy"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CartProduct;

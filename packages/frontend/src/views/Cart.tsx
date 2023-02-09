import { Grid, Pagination } from "@mui/material";
import { hideLoader, showLoader } from "../store/loaderReducer";
import { useEffect, useState } from "react";

import { AppDispatch } from "../store";
import { CartModel } from "../models/CartModel";
import CartProduct from "../components/CartProduct";
import { PagedResult } from "../models/PagedResult";
import Shared from "../util/shared";
import { showNotification } from "../store/notificationReducer";
import { useCardProductService } from "../services/cart.service";
import { useDispatch } from "react-redux";

const Cart: React.FC = () => {
  const cartProductService = useCardProductService();

  const [cartProductList, setCartProductList] = useState<
    PagedResult<CartModel[]>
  >({
    count: 0,
    items: [],
  });
  const [pageNumber, setPageNumber] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getProductDetails(pageNumber);
  }, [pageNumber]);

  const getProductDetails = async (pageNumber: number): Promise<void> => {
    dispatch(showLoader("medium"));
    try {
      const productList = await cartProductService.getList(pageNumber);
      setCartProductList(productList);
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

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    if (page !== pageNumber) {
      setPageNumber(page);
    }
  };

  return (
    <Grid container padding={4}>
      <Grid container spacing={3}>
        {cartProductList.items.map((product) => (
          <Grid key={product._id} item xs={3}>
            <CartProduct cartProduct={product} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" padding={1}>
        <Pagination
          page={pageNumber}
          count={Math.ceil(cartProductList.count / 10)}
          onChange={onChangePage}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default Cart;

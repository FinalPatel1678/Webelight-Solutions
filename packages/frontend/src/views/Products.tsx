import { Grid, Pagination } from "@mui/material";
import { hideLoader, showLoader } from "../store/loaderReducer";
import { useEffect, useState } from "react";

import { AppDispatch } from "../store";
import { PagedResult } from "../models/PagedResult";
import Product from "../components/Product";
import { ProductModel } from "../models/ProductModel";
import Shared from "../util/shared";
import { showNotification } from "../store/notificationReducer";
import { useDispatch } from "react-redux";
import { useProductService } from "../services/prduct.service";

const Products: React.FC = () => {
  const productService = useProductService();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [productList, setProductList] = useState<PagedResult<ProductModel[]>>({
    count: 0,
    items: [],
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getProductDetails(pageNumber);
  }, []);

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    setPageNumber(page);
    if (page !== pageNumber) {
      getProductDetails(page);
    }
  };

  const getProductDetails = async (page: number): Promise<void> => {
    dispatch(showLoader("medium"));
    try {
      const productList = await productService.getList(page);
      setProductList(productList);
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
    <Grid container padding={2}>
      <Grid container spacing={2}>
        {productList.items.map((product) => (
          <Grid key={product._id} item xs={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" padding={1}>
        <Pagination
          page={pageNumber}
          count={Math.ceil(productList.count / 10)}
          onChange={onChangePage}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default Products;

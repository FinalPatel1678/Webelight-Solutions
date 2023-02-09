import { hideLoader, showLoader } from "../../store/loaderReducer";
import { useEffect, useState } from "react";

import { AppDispatch } from "../../store";
import { Grid } from "@mui/material";
import { PagedResult } from "../../models/PagedResult";
import { ProductModel } from "../../models/ProductModel";
import { ProductsStyles } from "./Products.Styles";
import Shared from "../../util/shared";
import { showNotification } from "../../store/notificationReducer";
import { useDispatch } from "react-redux";
import { useProductService } from "../../services/prduct.service";

const Products: React.FC = () => {
  const productService = useProductService();

  const [productList, setProductList] = useState<PagedResult<ProductModel[]>>({
    count: 0,
    items: [],
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getProductDetails(1);
  }, []);

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
    <ProductsStyles>
      <Grid item xs={12} className="root">
        Products
      </Grid>
    </ProductsStyles>
  );
};

export default Products;

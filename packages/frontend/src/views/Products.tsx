import {
  Box,
  Button,
  Grid,
  MenuItem,
  Pagination,
  Slider,
  TextField,
} from "@mui/material";
import { hideLoader, showLoader } from "../store/loaderReducer";
import { useEffect, useState } from "react";

import { AppDispatch } from "../store";
import FilterParams from "../models/Filter";
import { PagedResult } from "../models/PagedResult";
import Product from "../components/Product";
import { ProductModel } from "../models/ProductModel";
import Shared from "../util/shared";
import { showNotification } from "../store/notificationReducer";
import { useDispatch } from "react-redux";
import { useProductService } from "../services/prduct.service";

const minDistance = 10;

const Products: React.FC = () => {
  const productService = useProductService();

  const [productList, setProductList] = useState<PagedResult<ProductModel[]>>({
    count: 0,
    items: [],
  });
  const [filterParam, setFilterParam] = useState<FilterParams>(
    new FilterParams()
  );
  const [dataFilterParam, setDataFilterParam] = useState<FilterParams>(
    new FilterParams()
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getProductDetails(dataFilterParam);
  }, [dataFilterParam]);

  const getProductDetails = async (
    filterParam: FilterParams
  ): Promise<void> => {
    dispatch(showLoader("medium"));
    try {
      const productList = await productService.getList(filterParam);
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

  const onChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    if (page !== dataFilterParam.pageNumber) {
      setDataFilterParam((prev) => ({ ...prev, pageNumber: page }));
    }
  };

  const handleChangePriceFilter = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let value: number[] = [];
    if (activeThumb === 0) {
      value = [
        Math.min(newValue[0], filterParam.priceFilter[1] - minDistance),
        filterParam.priceFilter[1],
      ];
    } else {
      value = [
        filterParam.priceFilter[0],
        Math.max(newValue[1], filterParam.priceFilter[0] + minDistance),
      ];
    }

    setFilterParam((prev) => ({ ...prev, priceFilter: value }));
  };

  const onChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam((prev) => ({ ...prev, category: event.target.value }));
  };

  const applyFilter = () => {
    setDataFilterParam(filterParam);
  };

  const clearFilter = () => {
    setDataFilterParam(new FilterParams());
    setFilterParam(new FilterParams());
  };

  return (
    <Grid container padding={4}>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={2}>
          <Slider
            size="small"
            value={filterParam.priceFilter}
            onChange={handleChangePriceFilter}
            valueLabelDisplay="on"
            disableSwap
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            select
            label="Select Category"
            onChange={onChangeCategory}
            value={filterParam.category}
          >
            <MenuItem value="">Default</MenuItem>
            {Shared.getCategories().map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="end">
            <Box p={1}>
              <Button color="primary" onClick={applyFilter} variant="contained">
                filter
              </Button>
            </Box>
            <Box p={1}>
              <Button
                color="secondary"
                onClick={clearFilter}
                variant="contained"
              >
                clear
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {productList.items.map((product) => (
          <Grid key={product._id} item xs={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" padding={1}>
        <Pagination
          page={dataFilterParam.pageNumber}
          count={Math.ceil(productList.count / 10)}
          onChange={onChangePage}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

export default Products;

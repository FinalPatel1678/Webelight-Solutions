import { CircularProgress, Grid } from "@mui/material";
import { Fragment, useMemo } from "react";

import { LoaderStyles } from "./Loader.Styles";
import { selectLoader } from "../../store/loaderReducer";
import { useSelector } from "react-redux";

const Loader: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const loader = useSelector(selectLoader);

  const sizeProps = useMemo(() => {
    switch (loader.size) {
      case "small":
        return 40;
      case "medium":
        return 50;
      case "large":
        return 70;
      default:
        return 50;
    }
  }, [loader.size]);

  return (
    <Fragment>
      {loader.show && (
        <LoaderStyles>
          <Grid item xs={12} className="root">
            <CircularProgress size={sizeProps} className="circle" />
          </Grid>
        </LoaderStyles>
      )}
      {children}
    </Fragment>
  );
};

export default Loader;

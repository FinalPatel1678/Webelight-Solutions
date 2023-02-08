import app from "./app";
import connectDatabase from "./config/dbConnection";

const PORT = process.env.PORT || 4000;

connectDatabase();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

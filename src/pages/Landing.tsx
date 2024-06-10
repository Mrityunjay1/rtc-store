import FeatureProduct from "../components/FeatureProduct";
import Hero from "../components/Hero";
import { type LoaderFunction } from "react-router-dom";
import { customFetch, type ProductsResponse } from "../utils";

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(
    "/products?featured=true"
  );
  console.log(response);
  return { ...response.data };
};

function Landing() {
  return (
    <>
      <Hero />
      <FeatureProduct />
    </>
  );
}
export default Landing;

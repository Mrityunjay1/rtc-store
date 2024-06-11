import { LoaderFunction, redirect, useLoaderData } from "react-router-dom";
import { ReduxStore } from "../store";
import { OrdersResponse, customFetch } from "../utils";
import { toast } from "../components/ui/use-toast";
import SectionTitle from "../components/SectionTitle";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";
import OrderList from "../components/OrderList";

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async ({ request }): Promise<OrdersResponse | Response | null> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast({ description: "Please login to continue" });
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get<OrdersResponse>("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      return { ...response.data };
    } catch (error) {
      console.log(error);
      toast({ description: "Failed to fetch orders" });
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData() as OrdersResponse;
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;

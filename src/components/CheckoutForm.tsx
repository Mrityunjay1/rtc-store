import { ActionFunction, Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { ReduxStore } from "../store";
import { toast } from "./ui/use-toast";
import { formatAsRupee } from "../utils/formatasRupee";
import { Checkout, customFetch } from "../utils";
import { clearItem } from "../features/cart/cartSlice";

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const address = formData.get("name") as string;

    if (!name || !address) {
      toast({ description: "please fill out all fields" });
      return null;
    }

    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: "please login to place an order" });
      return redirect("/login");
    }
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsRupee(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      store.dispatch(clearItem());
      toast({ description: "order placed" });
      return redirect("/orders");
    } catch (error) {
      toast({ description: "order failed" });
      return null;
    }
  };
const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;

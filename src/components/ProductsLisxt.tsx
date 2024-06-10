import { Link, useLoaderData } from "react-router-dom";
import { type ProductsResponse } from "../utils";
import { Card, CardContent } from "./ui/card";
import { formatAsRupee } from "../utils/formatasRupee";

const ProductsLisxt = () => {
  const { data: products } = useLoaderData() as ProductsResponse;
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((item) => {
        return (
          <Link to={`/products/${item.id}`}>
            <Card>
              <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                <img
                  src={item.attributes.image}
                  alt={item.attributes.title}
                  className="h-64 w-full md:w-48 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold capitalize">
                    {item.attributes.title}
                  </h2>
                  <h4>{item.attributes.company}</h4>
                  <p className="text-primary md:ml-auto">
                    {formatAsRupee(item.attributes.price)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsLisxt;

import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

export default function ProductPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

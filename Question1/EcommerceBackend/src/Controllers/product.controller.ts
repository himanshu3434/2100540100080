import { asyncHandler } from "../utils/asyncHandler.js";
import { cache } from "../index.js";
import axios from "axios";
const getAllProducts = asyncHandler(async (req, res) => {
  const { categoryName, minPrice, maxPrice, n, page } = req.params as any;
  const { sort } = req.params;
  let products;

  if (cache.has("products"))
    products = JSON.parse(cache.get("products") as string);
  else {
    console.log("Fetching products from API");
    const data = {
      companyName: "Jhstore",
      clientID: "3f661ae5-03ea-4654-87f9-913ba455db12",
      clientSecret: "PIHPtPaomEUtYvHC",
      ownerName: "Himanshu Yadav",
      ownerEmail: "himanshu.yadav3477@gmail.com",
      rollNo: "2100540100080",
    };
    const token = await axios.post("http://20.244.56.144/test/auth", data);
    const amzProducts = await axios.get(
      `http://20.244.56.144/test/companies/AMZ/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    const flpProducts = await axios.get(
      `http://20.244.56.144/test/companies/FLP/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    const snpProducts = await axios.get(
      `http://20.244.56.144/test/companies/SNP/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    const mynProducts = await axios.get(
      `http://20.244.56.144/test/companies/MYN/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    const azoProducts = await axios.get(
      `http://20.244.56.144/test/companies/AZO/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );

    const amzWithCategory = amzProducts.data.map((product: any) => ({
      ...product,
      company: "AMZ",
    }));
    const flpWithCategory = flpProducts.data.map((product: any) => ({
      ...product,
      company: "FLP",
    }));
    const snpWithCategory = snpProducts.data.map((product: any) => ({
      ...product,
      company: "SNP",
    }));
    const mynWithCategory = mynProducts.data.map((product: any) => ({
      ...product,
      company: "MYN",
    }));
    const azoWithCategory = azoProducts.data.map((product: any) => ({
      ...product,
      company: "AZO",
    }));

    products = [
      ...amzWithCategory,
      ...flpWithCategory,
      ...snpWithCategory,
      ...mynWithCategory,
      ...azoWithCategory,
    ];

    cache.set("products", JSON.stringify(products));
  }

  if (sort == "asc") products.sort((a: any, b: any) => a.price - b.price);
  else if (sort == "desc") products.sort((a: any, b: any) => b.price - a.price);
  else if (sort == "ascRating")
    products.sort((a: any, b: any) => a.rating - b.rating);
  else if (sort == "descDiscount")
    products.sort((a: any, b: any) => b.discount - a.discount);
  if (n > 10 && page > 1) {
    products = products.slice((page - 1) * 10, page + 10);
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export { getAllProducts };

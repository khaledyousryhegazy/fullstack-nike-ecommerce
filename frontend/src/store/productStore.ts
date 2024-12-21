import { create } from "zustand";
import axios from "axios";
import { Products } from "@/interfaces/interfaces";
import Alert from "@/components/Alert";

type State = {
  loader: boolean;
  products: Products[];
  product: Products | null;
  searchValue: Products[];
  message: string;
  value: string;
  page: number;
  hasMore: boolean;
  filters: string[];
  setFilters: (filters: string[] | ((prev: string[]) => string[])) => void;
  fetchProducts: () => Promise<void>;
  searchResult: (searchWords: string) => Promise<void>;
  getSingleProduct: (_id: string) => Promise<void>;
};

export const useProducts = create<State>((set, get) => ({
  loader: false,
  products: [],
  product: null,
  searchValue: [],
  message: "",
  value: "",
  page: 1,
  hasMore: true,
  filters: [],

  // get filters
  setFilters: (filters) =>
    set((state) => ({
      filters: typeof filters === "function" ? filters(state.filters) : filters,
      products: [],
      page: 1,
      hasMore: true,
    })),

  // execute products
  fetchProducts: async () => {
    const { page, products, filters, hasMore, loader } = get();

    if (!hasMore || loader) return; // Avoid duplicate calls

    set({ loader: true });
    const API_LINK = `http://localhost:8000/api/products`;

    try {
      const response = await axios.get(API_LINK, {
        params: {
          page,
          limit: 7,
          gender: filters.length ? filters.join(",") : undefined,
        },
      });

      const newProducts = response.data;

      set({
        products: [...products, ...newProducts],
        page: page + 1,
        hasMore: newProducts.length > 0,
        loader: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loader: false });
    }
  },

  searchResult: async (searchWords: string) => {
    // Handle empty search input upfront
    if (!searchWords.trim()) {
      set({
        searchValue: [],
        loader: false,
        message: "Please enter a keyword to search. 📝",
      });
      return;
    }

    set({ loader: true, value: searchWords });

    try {
      const API_LINK = `http://localhost:8000/api/products`;

      const params = { page: 1, limit: 100 };

      // Fetch data from API
      const { data: products = [] } = await axios.get(API_LINK, { params });

      // Filter results based on search words
      const results = products.filter((item: { title: string }) =>
        item?.title.toLowerCase().includes(searchWords.toLowerCase())
      );

      // Update state based on results
      set({
        searchValue: results,
        loader: false,
        message: results.length > 0 ? "" : "No products match your search. 😢",
      });
    } catch (error) {
      console.error("Error fetching products:", error);

      set({
        searchValue: [],
        loader: false,
        message:
          "Failed to fetch products. Please check your connection or try again later. 🔄",
      });
    }
  },

  getSingleProduct: async (_id: string) => {
    try {
      const API_LINK = `http://localhost:8000/api/products/${_id}`;
      const response = await axios.get(API_LINK);

      set({ product: response.data?.data });
    } catch (error) {
      // Handle and log the error
      const fetchError = error instanceof Error ? error.message : String(error);
      Alert({ title: `Error fetching product: ${fetchError}`, icon: "error" });
    }
  },
}));

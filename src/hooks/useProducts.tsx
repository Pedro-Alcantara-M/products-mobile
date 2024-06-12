import {useState} from 'react';
import {api} from '../config/api';
import useAuth from './useAuth';

export interface Product {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
}

type ProductResponse = {
  data: Product[] | null;
  status: number | null;
};

export const useProducts = () => {
  const {token} = useAuth();
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProductList = async () => {
    setLoading(true);
    const resp: ProductResponse = {
      data: null,
      status: null,
    };
    await api
      .get('/product', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        resp.data = response.data;
        resp.status = response.status;
      })
      .catch(error => {
        if (error.response) {
          resp.data = error.response.data;
          resp.status = error.response.status;
        }
      })
      .finally(() => {
        setLoading(false);
        return setProducts(resp);
      });
  };

  const editProduct = async (id: string, data: Product) => {
    setUpdateLoading(true);
    const resp: ProductResponse = {
      data: null,
      status: null,
    };

    await api
      .put(`/product/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        resp.data = response.data;
        resp.status = response.status;
        setUpdateLoading(false);
      })
      .catch(error => {
        if (error.response) {
          resp.data = error.response.data;
          resp.status = error.response.status;
          setUpdateLoading(false);
        }
      });

    return resp;
  };

  const addProduct = async (data: Product) => {
    setaddLoading(true);
    const resp: ProductResponse = {
      data: null,
      status: null,
    };

    await api
      .post('/product/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        resp.data = response.data;
        resp.status = response.status;
        setaddLoading(false);
      })
      .catch(error => {
        if (error.response) {
          resp.data = error.response.data;
          resp.status = error.response.status;
          setaddLoading(false);
        }
      });

    return resp;
  };

  const deleteProduct = async ({id}: {id: string}) => {
    setDeleteLoading(true);
    const resp: ProductResponse = {
      data: null,
      status: null,
    };
    await api
      .delete(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        resp.status = response.status;
      })
      .catch(error => {
        if (error.response) {
          resp.data = error.response.data;
          resp.status = error.response.status;
        }
      })
      .finally(() => {
        setDeleteLoading(false);
      });

    return resp;
  };

  return {
    products,
    loading,
    updateLoading,
    addLoading,
    deleteLoading,
    editProduct,
    getProductList,
    addProduct,
    deleteProduct,
  };
};

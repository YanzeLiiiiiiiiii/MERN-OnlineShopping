import { PRODUCTS_URL } from '../constant';
import { apiSlice } from './apiSlice';

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber }) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: '/upload',
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            providesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.id}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTop: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),

    }),
});

export const { useGetTopQuery, useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation } = productSlice;
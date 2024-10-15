import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from "../../types";
import * as getPriceUtil from '../../utils/getPrice';

describe('ProductCard test', () => {
    const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'best product',
        price: 777,
        priceSymbol: '₽',
        category: 'Для дома',
        imgUrl: '/product.png',
    };

    it('should render correctly', () => {
        const { asFragment } = render(<ProductCard {...product} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly without image', () => {
        const productWithoutImg = { ...product, imgUrl: undefined };
        const { asFragment } = render(<ProductCard {...productWithoutImg} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should not render img', () => {
        const rendered = render(
            <ProductCard
                id={1}
                name={'afanas'}
                description={'hello55'}
                price={777}
                category={'Электроника'}
                priceSymbol={'₽'}
            />
        );

        expect(rendered.queryByRole('img')).toBeNull();

        expect(rendered.getByText(/₽/)).toBeInTheDocument();
    });

    it('should call once getPrice util', () => {
        const mockGetPrice = jest.spyOn(getPriceUtil, 'getPrice');
        expect(mockGetPrice).not.toBeCalled();
        render(
            <ProductCard
                id={1}
                name={'niceday55'}
                description={'ananas'}
                price={333}
                category={'Для дома'}
            />
        );
        expect(mockGetPrice).toBeCalledTimes(1);
    });
});
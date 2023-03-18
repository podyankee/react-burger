import style from './Catalog.module.css';

import { Order } from '../Order/Order';
import { Container } from '../Container/Container';
import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { useSelector, useDispatch } from 'react-redux';
import { productRequestAsync } from '../../store/product/productSlice';
import { useEffect } from 'react';

export const Catalog = () => {
	const { products, flag } = useSelector(state => state.product);
	const dispatch = useDispatch();
	const { category, activeCategory } = useSelector(state => state.category);

	useEffect(() => {
		if (category.length) {
			dispatch(productRequestAsync(category[activeCategory].title));
		}
	}, [category, activeCategory]);

	return (
		<section className={style.catalog}>
			<Container className={style.container}>
				<Order />
				<div className={style.wrapper}>
					<h2 className={style.title}>{category[activeCategory]?.rus}</h2>

					<div className={style.wrap_list}>
						{products.length ? (
							<ul className={style.list}>
								{products.map(item => (
									<li key={item.id} className={style.item}>
										<CatalogProduct item={item} />
									</li>
								))}
							</ul>
						) : (
							flag && (
								<p className={style.empty}>К сожалению товаров в данной категории не найдено.</p>
							)
						)}
					</div>
				</div>
			</Container>
		</section>
	);
};

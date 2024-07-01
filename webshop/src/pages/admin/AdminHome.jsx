import React from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';


function AdminHome() {

	const { t, i18n } = useTranslation();
	// return <h1>{t('Welcome to React')}</h1>

	return (
		<div>
			<Button variant="primary" as={Link} to="/admin/maintain-categories">{t("maintain-categories")}</Button>{' '}
			<Button variant="secondary" as={Link} to="/admin/maintain-shops">{t("maintain-shops")}</Button>{' '}
			<Button variant="success" as={Link} to="/admin/add-product">{t("add-product")}</Button>{' '}
			<Button variant="warning" as={Link} to="/admin/maintain-products">{t("maintain-products")}</Button>{' '}
			<Button variant="info" as={Link} to="/admin/supplier">{t("supplier")}</Button>{' '}
			<Button variant="dark" as={Link} to="/admin/book-supplier">{t("book-supplier")}</Button>
		</div>
	)
}

export default AdminHome
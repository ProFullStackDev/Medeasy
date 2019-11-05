import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryLoading,
	selectInventoryCategory
} from '../../redux/selectors/inventorySelectors'
import {
	addCategory,
	fetchCategoryById,
	updateCategory
} from '../../redux/actions/inventoryActions'

import CustomButton from '../../components/CustomButton'
import CustomFormElement from '../../components/CustomFormElement'
import Spinner from '../../components/Spinner'

const AdminCategoriesForm = ({
	loading,
	addCategory,
	updateCategory,
	category,
	fetchCategoryById,
	match: {
		url,
		params: { categoryId }
	}
}) => {
	const pageTitle =
		url === '/admin/dashboard/add-category' ? 'Add a Condition' : 'Edit Condition'

	useEffect(() => {
		const fetchData = async () => {
			if (url === `/admin/dashboard/edit-category/${categoryId}`) {
				const { name, description } = await fetchCategoryById(categoryId)
				setFormState({ name, description })
			}
		}
		fetchData()
	}, [categoryId, fetchCategoryById, url])

	const [formState, setFormState] = useState({
		name: '',
		description: ''
	})

	const { name, description } = formState

	const handleSubmit = event => {
		event.preventDefault()
		if (url === `/admin/dashboard/edit-category/${categoryId}`)
			updateCategory(formState, categoryId)
		else addCategory(formState)
	}

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })

	return loading ? (
		<Spinner white={false} />
	) : url === `/admin/dashboard/edit-category/${categoryId}` && !category ? (
		<Spinner white={false} />
	) : (
		<div style={{ width: '80%' }} className="AdminDashboardPage__category-form">
			<h2>{pageTitle}</h2>
			<form onSubmit={handleSubmit}>
				<CustomFormElement
					required
					type="text"
					name="name"
					value={name}
					onChange={handleChange}
					placeholder="Condition Name"
				/>

				<CustomFormElement
					isTextArea
					type="text"
					name="description"
					value={description}
					onChange={handleChange}
					placeholder="Condition Description"
				/>
				<CustomButton extraStyle={{ width: '100%' }} isSubmitButton>
					{url === `/admin/dashboard/edit-category/${categoryId}`
						? 'Edit Condition'
						: 'Add Condition'}
				</CustomButton>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectInventoryLoading,
	category: selectInventoryCategory
})

export default connect(
	mapStateToProps,
	{ addCategory, fetchCategoryById, updateCategory }
)(AdminCategoriesForm)

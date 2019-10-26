import React from 'react'
import CategoriesListItem from './CategoriesListItem'

const CategoriesList = ({ categories, onClick }) => {
	return (
		<table className="AdminDashboardPage__categories-table">
			<thead>
				<tr>
					<th>S.No</th>
					<th>Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{categories.map((category, index) => (
					<CategoriesListItem onClick={onClick} key={category._id} category={category} index={index} />
				))}
			</tbody>
		</table>
	)
}

export default CategoriesList

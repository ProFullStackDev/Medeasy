import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryCategories, selectInventoryLoading } from '../../redux/selectors/inventorySelectors'
import { fetchAllCategories, addProduct } from '../../redux/actions/inventoryActions'

import CustomButton from '../../components/CustomButton'
import CustomFormElement from '../../components/CustomFormElement'
import Spinner from '../../components/Spinner'

import emptyImage from '../../images/empty.jpg'

const AdminCreateProduct = ({ history, loading, categories, fetchAllCategories, addProduct }) => {
	useEffect(() => {
		fetchAllCategories()
		return
	}, [fetchAllCategories])

	const [formState, setFormState] = useState({
		name: '',
		category: '',
		description: '',
		productImages: [],
		sideEffects: '',
		dosages: '',
		quantities: '',
		prices: ''
	})

  const [fileErrorMessages, setFileErrorMessages] = useState([])

	const {
		name,
		description,
		category,
		productImages,
		sideEffects,
		dosages,
		quantities,
		prices
	} = formState

	const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('dosages', dosages)
    data.append('price', prices)
    data.append('quantities', quantities)
    data.append('sideEffects', sideEffects)
    data.append('product-image', productImages[0])
    data.append('product-image', productImages[1])
    data.append('product-image', productImages[2])
    
    addProduct(data, category, history)
	}

	const storeImages = files => {
		const tempImages = []
		files.forEach((file, index) => {
			const fileReader = new FileReader()
			fileReader.onload = function() {
				tempImages.push(this.result)
				const im = document.querySelector(`.image-${index + 1}`)
				im.setAttribute('src', this.result)
			}
			fileReader.readAsDataURL(file)
		})
	}

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })

	const handleFileChange = event => {
		const files = Array.from(event.target.files)
		// Checking the file count
		if (files.length < 3 || files.length > 3) {
			setFileErrorMessages([...fileErrorMessages, 'Minimum 3 images required'])
			setFormState({ ...formState, productImages: [] })
			event.target.value = null
		} else {
			// Checking the file MIME TYPE
			const fileTypes = ['image/png', 'image/jpeg']
			files.forEach(file => {
				const checker = fileTypes.includes(file.type)
				if (checker) {
					// Checking file SIZE Limit
					if (file.size > 1024 * 1024 * 2) {
						console.log('Large')
						setFileErrorMessages([
							...fileErrorMessages,
							`${file.name}'s size is larger than 2MB`
						])
						setFormState({ ...formState, productImages: [] })
						event.target.value = null
					}
				} else {
					setFileErrorMessages([
						...fileErrorMessages,
						`${file.name}'s type is not supported`
					])
					setFormState({ ...formState, productImages: [] })
					event.target.value = null
				}
			})
			setFormState({ ...formState, productImages: Array.from(event.target.files) })
			storeImages(Array.from(event.target.files))
		}
	}

	const handleFileClick = event => {
		event.preventDefault()
		setFileErrorMessages([])
		document.querySelector('#file').click()
	}

	return !categories || loading ? (
		<Spinner />
	) : (
		<div className="AdminDashboardPage__product-form">
			<div className="AdminDashboardPage__product-form--left">
				<h2>Add a product</h2>
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<CustomFormElement
						required
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						placeholder="Product Name"
					/>

					<select
						required
						name="category"
						value={category}
						onChange={handleChange}
					>
						<option value="" defaultValue disabled>
							Select Category
						</option>
						{categories.map(category => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>

					<CustomFormElement
						required
						placeholder="Product Dosages"
						name="dosages"
						value={dosages}
						onChange={handleChange}
					/>
					<small>Please seperate each dosage with a comma ( , )</small>

					<CustomFormElement
						required
						placeholder="Product Quantities"
						name="quantities"
						value={quantities}
						onChange={handleChange}
					/>
					<small>Please seperate each quantity with a comma ( , )</small>

					<CustomFormElement
						required
						placeholder="Product Prices"
						name="prices"
						value={prices}
						onChange={handleChange}
					/>
					<small>Please seperate each price with a comma ( , )</small>
					<small>Total prices should be No.of Quantities X No.of Dosages</small>

					<CustomFormElement
						required
						isTextArea
						name="description"
						onChange={handleChange}
						value={description}
						placeholder="Product Description"
					/>

					<CustomFormElement
						required
						placeholder="Product Side effects"
						name="sideEffects"
						value={sideEffects}
						onChange={handleChange}
					/>
					<small>Please seperate each side effect with a comma ( , )</small>

					<input
						id="file"
						hidden
						type="file"
						name="productImages"
						onChange={handleFileChange}
						multiple
					/>
					<div className="AdminDashboardPage__product-form--left__file">
						<CustomButton type="button" onClick={handleFileClick}>
							Select File
						</CustomButton>
						<span style={{ marginLeft: '1.5rem' }}>
							{productImages.length
								? `${productImages.length} files chosen`
								: 'No file chosen'}
						</span>
					</div>

					{fileErrorMessages.length
						? fileErrorMessages.map((message, index) => (
								<small key={index} style={{ color: 'red' }}>
									{message}
								</small>
						  ))
						: null}

					<CustomButton
						disabled={productImages.length < 3 ? true : false}
						extraStyle={{ width: '100%' }}
						isSubmitButton
					>
						Add Product
					</CustomButton>
				</form>
			</div>
			<div className="AdminDashboardPage__product-form--right">
				<h2>Image Previews</h2>
				<div className="AdminDashboardPage__product-form--right__images">
					<div className="AdminDashboardPage__product-form--right__image">
						<img
							className="image-1"
							style={{ width: '100%', height: '100%' }}
							src={!productImages.length ? emptyImage : ''}
							alt="Product"
						/>
					</div>
					<div className="AdminDashboardPage__product-form--right__image">
						<img
							className="image-2"
							style={{ width: '100%', height: '100%' }}
							src={!productImages.length ? emptyImage : ''}
							alt="Product"
						/>
					</div>
					<div className="AdminDashboardPage__product-form--right__image">
						<img
							className="image-3"
							style={{ width: '100%', height: '100%' }}
							src={!productImages.length ? emptyImage : ''}
							alt="Product"
						/>
					</div>
				</div>
				<h2>Product Details Preview</h2>
				<div className="AdminDashboardPage__product-form--right__info">
					<p>Name: {name}</p>
					<p>Category ID: {category}</p>
					<p>
						Dosages:{' '}
						{dosages.includes(',') ? (
							<>
								{dosages.split(',').map((effect, index) => (
									<li key={index}>{effect} mg</li>
								))}
							</>
						) : (
							dosages + ' mg'
						)}
					</p>
					<p>
						Quantities:{' '}
						{quantities.includes(',') ? (
							<>
								{quantities.split(',').map((effect, index) => (
									<li key={index}>{effect} Pills</li>
								))}
							</>
						) : (
							quantities + ' Pills'
						)}
					</p>
					<p>
						Prices:{' '}
						{prices.includes(',') ? (
							<>
								{prices.split(',').map((price, index) => (
									<li key={index}>
										{dosages.split(',')[Math.floor(index / quantities.split(',').length)] +
											'mg: ' +
											quantities.split(',')[Math.floor(index % quantities.split(',').length)] + 'Pills -> ' + price + '$'}
									</li>
								))}
							</>
						) : (
							prices
						)}
					</p>
					<p>
						Side Effects:{' '}
						{sideEffects.includes(',') ? (
							<>
								{sideEffects.split(',').map((effect, index) => (
									<li key={index}>{effect}</li>
								))}
							</>
						) : (
							sideEffects
						)}
					</p>
					<p>Description: {description}</p>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	categories: selectInventoryCategories,
	loading: selectInventoryLoading
})

export default connect(
	mapStateToProps,
	{ fetchAllCategories, addProduct }
)(AdminCreateProduct)

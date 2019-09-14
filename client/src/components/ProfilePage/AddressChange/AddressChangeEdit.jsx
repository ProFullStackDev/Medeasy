import React, {Component} from 'react'
import '../../../styles/components/AddressChangeEdit.scss'
import PhoneFormElement from '../../PhoneFormElement'
import CustomFormElement from '../../CustomFormElement'
import CustomBadge from '../../CustomBadge'
import CustomButton from '../../CustomButton'

class AddressChangeEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addressType: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phNumber: '',
      faxNumber: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.selectAddressType = this.selectAddressType.bind(this)
  }

  selectAddressType (addressType) {
    this.setState({ addressType })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick () {
    this.props.changeEditMode(false)
  }

  handleSubmit (event) {
    event.preventDefault()
    // This must save the address to the backend
    console.log('Submitting the addresses')
    // Then it goes back to display mode
    this.props.changeEditMode(false)
  }

  render () {
    return (
      <div className='AddressChangeEdit'>
        <h2 className='ProfilePageDisplay__phase-title'>Add Addresses</h2>
        <div className='AddressChangeEdit__badges'>
          <CustomBadge onClick={this.selectAddressType} selected={this.state.addressType === 'Home'} badgeValue='Home' />
          <CustomBadge onClick={this.selectAddressType} selected={this.state.addressType === 'Work'} badgeValue='Work' />
          <CustomBadge onClick={this.selectAddressType} selected={this.state.addressType === 'Other'} badgeValue='Other' />
        </div>
        <form className='AddressChangeEdit__form' onSubmit={this.handleSubmit}>
          <CustomFormElement onChange={ this.handleChange } labelName='Address Line 1' type='text' name='address1' value={this.state.address1} />
          <CustomFormElement onChange={ this.handleChange } labelName='Address Line 2' type='text' name='address2' value={this.state.address2} />
          <div className='AddressChangeEdit__form-half'>
            <CustomFormElement onChange={ this.handleChange } labelName='City' type='text' name='city' value={this.state.city} />
            <CustomFormElement onChange={ this.handleChange } labelName='State / Province' type='text' name='state' value={this.state.state} />
          </div>
          <div className='AddressChangeEdit__form-half'>
            <CustomFormElement onChange={ this.handleChange } labelName='Zip / Postal Code' type='text' name='postalCode' value={this.state.postalCode} />
            <CustomFormElement onChange={ this.handleChange } labelName='Country' type='text' name='country' value={this.state.country} />
          </div>
          <div className='AddressChangeEdit__form-half'>
            <PhoneFormElement onChange={ this.handleChange } value={ this.state.phNumber }/>
            <CustomFormElement onChange={ this.handleChange } labelName='Fax' type='number' name='faxNumber' value={this.state.faxNumber} />
          </div>
          <div className='AddressChangeEdit__form-buttons'>
            <CustomButton onClick={ this.handleClick } extraStyle={{ minWidth: '15rem', background: 'transparent', border: '1px solid #DDD7D7', color: '#4a4a4a' }} >Cancel</CustomButton>
            <CustomButton type='submit'>Save Address</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default AddressChangeEdit
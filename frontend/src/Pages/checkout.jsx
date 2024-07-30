import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
} from "@mui/material";
import "./styles/checkout.scss";

const steps = ["Shipping Address", "Payment Details", "Review Order"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    paymentMethod: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    upiId: "",
  });
  const [formErrors, setFormErrors] = useState({});
  //redux
  const { CheckoutProducts, totalCheckoutPrice } = useSelector(
    (state) => state.checkout
  );

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateStep = (step) => {
    let errors = {};
    if (step === 0) {
      if (!formValues.firstName) errors.firstName = "First Name is required";
      if (!formValues.lastName) errors.lastName = "Last Name is required";
      if (!formValues.address1) errors.address1 = "Address Line 1 is required";
      if (!formValues.city) errors.city = "City is required";
      if (!formValues.state) errors.state = "State/Province/Region is required";
      if (!formValues.zip) errors.zip = "Zip / Postal Code is required";
      if (!formValues.country) errors.country = "Country is required";
    } else if (step === 1) {
      if (!formValues.paymentMethod)
        errors.paymentMethod = "Payment method is required";
      if (formValues.paymentMethod === "Card") {
        if (!formValues.cardName) errors.cardName = "Name on Card is required";
        if (!formValues.cardNumber)
          errors.cardNumber = "Card Number is required";
        if (!formValues.expDate) errors.expDate = "Expiry Date is required";
        if (!formValues.cvv) errors.cvv = "CVV is required";
      } else if (formValues.paymentMethod === "UPI") {
        if (!formValues.upiId) errors.upiId = "UPI ID is required";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ShippingAddressForm
            values={formValues}
            errors={formErrors}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <PaymentDetailsForm
            values={formValues}
            errors={formErrors}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <ReviewOrder
            orderDetails={formValues}
            products={CheckoutProducts}
            totalPrice={totalCheckoutPrice}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div className="checkout">
      <Stepper activeStep={activeStep} className="stepper">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="step-content">
        {activeStep === steps.length ? (
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
        ) : (
          <>
            {getStepContent(activeStep)}
            <div className="buttons">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className="button"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className="button"
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ShippingAddressForm = ({ values, errors, handleChange }) => (
  <Paper className="form-container">
    <Typography variant="h6" gutterBottom>
      Shipping Address
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          label="First Name"
          fullWidth
          value={values.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          label="Last Name"
          fullWidth
          value={values.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          label="Address Line 1"
          fullWidth
          value={values.address1}
          onChange={handleChange}
          error={!!errors.address1}
          helperText={errors.address1}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          label="Address Line 2"
          fullWidth
          value={values.address2}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          label="City"
          fullWidth
          value={values.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="state"
          label="State/Province/Region"
          fullWidth
          value={values.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          label="Zip / Postal Code"
          fullWidth
          value={values.zip}
          onChange={handleChange}
          error={!!errors.zip}
          helperText={errors.zip}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          label="Country"
          fullWidth
          value={values.country}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        />
      </Grid>
    </Grid>
  </Paper>
);

const PaymentDetailsForm = ({
  values,
  errors,
  handleChange,
  handleSelectChange,
}) => (
  <Paper className="form-container">
    <Typography variant="h6" gutterBottom>
      Payment Details
    </Typography>
    <FormControl fullWidth>
      <InputLabel id="paymentMethod-label">Payment Method</InputLabel>
      <Select
        labelId="paymentMethod-label"
        id="paymentMethod"
        name="paymentMethod"
        value={values.paymentMethod}
        onChange={handleSelectChange}
        error={!!errors.paymentMethod}
      >
        <MenuItem value="Card">Card</MenuItem>
        <MenuItem value="UPI">UPI</MenuItem>
      </Select>
    </FormControl>
    {errors.paymentMethod && (
      <Typography color="error" variant="body2">
        {errors.paymentMethod}
      </Typography>
    )}
    {values.paymentMethod === "Card" && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on Card"
            fullWidth
            value={values.cardName}
            onChange={handleChange}
            error={!!errors.cardName}
            helperText={errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card Number"
            fullWidth
            value={values.cardNumber}
            onChange={handleChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry Date"
            fullWidth
            value={values.expDate}
            onChange={handleChange}
            error={!!errors.expDate}
            helperText={errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            value={values.cvv}
            onChange={handleChange}
            error={!!errors.cvv}
            helperText={errors.cvv}
          />
        </Grid>
      </Grid>
    )}
    {values.paymentMethod === "UPI" && (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="upiId"
            label="UPI ID"
            fullWidth
            value={values.upiId}
            onChange={handleChange}
            error={!!errors.upiId}
            helperText={errors.upiId}
          />
        </Grid>
      </Grid>
    )}
  </Paper>
);

const ReviewOrder = ({ orderDetails, products, price }) => (
  <Paper className="form-container">
    <Typography variant="h6" gutterBottom>
      Review Order
    </Typography>
    <Typography variant="body1">
      First Name: {orderDetails.firstName}
    </Typography>
    <Typography variant="body1">Last Name: {orderDetails.lastName}</Typography>
    <Typography variant="body1">Address 1: {orderDetails.address1}</Typography>
    <Typography variant="body1">Address 2: {orderDetails.address2}</Typography>
    <Typography variant="body1">City: {orderDetails.city}</Typography>
    <Typography variant="body1">State: {orderDetails.state}</Typography>
    <Typography variant="body1">Zip: {orderDetails.zip}</Typography>
    <Typography variant="body1">Country: {orderDetails.country}</Typography>
    <Typography variant="body1">
      Payment Method: {orderDetails.paymentMethod}
    </Typography>
    {orderDetails.paymentMethod === "Card" && (
      <>
        <Typography variant="body1">
          Card Name: {orderDetails.cardName}
        </Typography>
        <Typography variant="body1">
          Card Number: {orderDetails.cardNumber}
        </Typography>
        <Typography variant="body1">
          Expiry Date: {orderDetails.expDate}
        </Typography>
        <Typography variant="body1">CVV: {orderDetails.cvv}</Typography>
      </>
    )}
    {orderDetails.paymentMethod === "UPI" && (
      <Typography variant="body1">UPI ID: {orderDetails.upiId}</Typography>
    )}

    <div className="product-details">
      {products.map((product) => (
        <Card
          key={product._id}
          className=" d-flex mt-1 align-items-center flex-grow-1"
        >
          <img
            src={product.image}
            alt={product.name}
            width={"120px"}
            height={"120px"}
          />
          <div>
            <Typography variant="body1">Name : {product.name}</Typography>
            <Typography variant="body1">Price :{product.price}</Typography>
            <Typography variant="body1">Qty : {product.qty || 1}</Typography>
          </div>
        </Card>
      ))}
      <div>
        <Typography variant="body1">
          Total: {price || products[0]?.price}
        </Typography>
      </div>
    </div>
  </Paper>
);

export default Checkout;

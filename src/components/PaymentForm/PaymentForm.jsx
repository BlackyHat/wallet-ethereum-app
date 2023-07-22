import { useState } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { toast } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { VscSend } from 'react-icons/vsc';
import { startPayment } from '../../utils/payment';
import { paymentSchema } from '../../validation/validationYup';

import scss from './PaymentForm.module.scss';
import Loader from '../Loader/Loader';

const PaymentForm = ({ balance, onConnect, setTransactions }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (values) => {
    setIsLoading(true);
    const { ether, address } = values;
    try {
      await startPayment({
        setErrorMessage,
        setTransactions,
        ether: ether.toString(),
        address,
      });
      await onConnect();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error('Something went wrong.');
    }
  };

  return (
    <Formik
      initialValues={{ address: '', ether: 0 }}
      validationSchema={paymentSchema}
      onSubmit={submit}
    >
      {({ errors, touched, dirty, isValid, setFieldValue }) => {
        return (
          <Form className={scss.payingForm}>
            <label htmlFor="address" className={scss.label}>
              Recipient address
              <Field
                name="address"
                id="address"
                type="text"
                placeholder="Recipient Address"
                className={clsx(
                  scss.input,
                  errors.address && touched.address ? scss.isInvalid : '',
                  !errors.address && touched.address ? scss.isValid : ''
                )}
              />
              <ErrorMessage
                name="address"
                component="div"
                className={scss.errorMessage}
              />
            </label>

            <label htmlFor="ether" className={scss.label}>
              Amount in ETH
              <Field
                name="ether"
                id="ether"
                type="number"
                min="0"
                step="0.001"
                max={balance}
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedValue = +Number.parseFloat(value).toFixed(3);
                  setFieldValue('ether', formattedValue);
                }}
                placeholder="Amount in ETH"
                className={clsx(
                  scss.input,
                  errors.ether && touched.ether ? scss.isInvalid : '',
                  !errors.ether && touched.ether ? scss.isValid : ''
                )}
              />
              <ErrorMessage
                name="ether"
                component="div"
                className={scss.errorMessage}
              />
            </label>
            <button
              type="submit"
              className={scss.submitButton}
              disabled={!dirty || !isValid || isLoading}
            >
              Send payment
              {isLoading ? <Loader /> : <VscSend />}
            </button>
            {errorMessage && (
              <div className={scss.errorMessage}>{errorMessage}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default PaymentForm;

PaymentForm.propTypes = {
  balance: PropTypes.number.isRequired,
  onConnect: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
};

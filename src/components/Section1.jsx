import React from 'react';
import { useFormData } from '../context/FormDataContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import cities from '../data/city.json';
import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from './FormsUI/Text';
import DateTimePicker from './FormsUI/Text/DataTimePicker';
import Select from './FormsUI/Text/Select';
import CheckBox from './FormsUI/Checkbox';
import Submit from './FormsUI/Button';
import genders from '../data/gender.json';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  s1_firstname: '',
  s1_lastname: '',
  s1_middlename: '',
  s1_dob: '',
  s1_sex: '',
  s1_healthnum: '',
  s1_email: '',
  s1_postalcode1: '',
  s1_postalcode2: '',
  s1_regularmail: false,
  s1_emailcheck: false,
  s1_addressline1: '',
  s1_addressline2: '',
  s1_city1: '',
  s1_city2: '',
  s1_mailingadd: false,
};

const FORM_VALIDATION = Yup.object().shape({
  s1_firstname: Yup.string().required('Required'),
  s1_lastname: Yup.string().required('Required'),
  s1_middlename: Yup.string().required('Required'),
  s1_email: Yup.string().email('Invalid email').required('Required'),
  s1_healthnum: Yup.number().integer().typeError('Please enter a valid phone number').required('Required'),
  s1_postalcode1: Yup.number().integer().typeError('Please enter a valid postal code').required('Required'),
  s1_postalcode2: Yup.number().integer().typeError('Please enter a valid postal code').required('Required'),
  s1_addressline1: Yup.string().required('Required'),
  s1_addressline2: Yup.string(),
  s1_city1: Yup.string().required('Required'),
  s1_city2: Yup.string().required('Required'),
  s1_sex: Yup.string().required('Required'),
  s1_dob: Yup.date().required('Required'),
  s1_mailingadd: Yup.boolean(),
  s1_emailcheck: Yup.boolean(),
  s1_regularmail: Yup.boolean()
});

const Selection1 = () => {
  const classes = useStyles();
  const { updateFormData } = useFormData();

  const handleSubmit = (values) => {
    updateFormData(values);
    console.log(values); // You can remove this if you don't need it anymore
  };


  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container className='section-one' style={{ width: '95%' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Section 1- I want to enroll myself with the family doctor </Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField name="s1_firstname" label="First Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_lastname" label="Last Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_middlename" label="Middle Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <DateTimePicker name="s1_dob" label="Date of Birth" />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_sex" label="Gender" options={genders} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_healthnum" label="Health Number" />
                  </Grid>
                  <Grid item xs={6} style={{ paddingRight: '60px' }}>
                    <TextField name="s1_email" label="Email" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Send notices from my family doctor’s office to me by:</Typography>
                    <div style={{ display: 'flex' }}>
                      <CheckBox name='s1_regularmail' label='Regular Mail' />
                      <CheckBox name='s1_emailcheck' label='Email (Optional)' />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Mailing Address</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField name="s1_addressline1" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_city1" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_postalcode1" label="Postal Code" />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Residence Address</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CheckBox name="s1_mailingadd" label="Same as mailing address" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_addressline2" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_city2" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_postalcode2" label="Postal Code" />
                  </Grid>

                  <Submit>Save</Submit>
                </Grid>
              </div>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Section 1- I want to enroll myself with the family doctor </Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField name="s1_firstname" label="First Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_lastname" label="Last Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_middlename" label="Middle Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <DateTimePicker name="s1_dob" label="Date of Birth" />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_sex" label="Gender" options={genders} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_healthnum" label="Health Number" />
                  </Grid>
                  <Grid item xs={6} style={{ paddingRight: '60px' }}>
                    <TextField name="s1_email" label="Email" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Send notices from my family doctor’s office to me by:</Typography>
                    <div style={{ display: 'flex' }}>
                      <CheckBox name='s1_regularmail' label='Regular Mail' />
                      <CheckBox name='s1_emailcheck' label='Email (Optional)' />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Mailing Address</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField name="s1_addressline1" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_city1" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_postalcode1" label="Postal Code" />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Residence Address</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CheckBox name="s1_mailingadd" label="Same as mailing address" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_addressline2" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s1_city2" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s1_postalcode2" label="Postal Code" />
                  </Grid>

                  <Submit>Save</Submit>
                </Grid>
              </div>
            </Container>
          </Grid>
          
        </Grid>
      </Form>
    </Formik>
  );
};

export default Selection1;

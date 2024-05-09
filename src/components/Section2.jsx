import React from 'react';
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
import Submit from './FormsUI/Button'
import genders from '../data/gender.json';
import { useFormData } from '../context/FormDataContext'; // 1. Import the useFormData hook

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  s2_firstname: '',
  s2_lastname: '',
  s2_middlename: '',
  s2_dob: '',
  s2_sex: '',
  s2_healthnum: '',
  s2_email: '',
  s2_postalcode1: '',
  s2_postalcode2: '',
  s2_parentcheck: false,
  s2_legalcheck: false,
  s2_autornycheck: false,
  s2_addressline1: '',
  s2_addressline2: '',
  s2_city1: '',
  s2_city2: '',
  s2_mailingadd: false,
};

const FORM_VALIDATION = Yup.object().shape({
  s2_firstname: Yup.string().required('Required'),
  s2_lastname: Yup.string().required('Required'),
  s2_middlename: Yup.string().required('Required'),
  s2_email: Yup.string().email('Invalid email').required('Required'),
  s2_healthnum: Yup.number().integer().typeError('Please enter a valid phone number').required('Required'),
  s2_postalcode1: Yup.number().integer().typeError('Please enter a valid postal code').required('Required'),
  s2_postalcode2: Yup.number().integer().typeError('Please enter a valid postal code').required('Required'),
  s2_addressline1: Yup.string().required('Required'),
  s2_addressline2: Yup.string(),
  s2_city1: Yup.string().required('Required'),
  s2_city2: Yup.string().required('Required'),
  s2_sex: Yup.string().required('Required'),
  s2_dob: Yup.date().required('Required'),
  s2_autornycheck: Yup.boolean(),
  s2_parentcheck: Yup.boolean(),
  s2_legalcheck: Yup.boolean(),
  s2_regularmail: Yup.boolean()
});

const Selection2 = () => {
  const classes = useStyles();
  const { updateFormData } = useFormData(); // 2. Use the useFormData hook

  const handleSubmit = (values) => {
    updateFormData(values); // 3. Call updateFormData with the form values
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container className='section-two' style={{ width: '95%' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Section 2 – I want to enrol my child(ren) under 16 and/or dependent adult(s) with the family doctor identified</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField name="s2_firstname" label="First Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_lastname" label="Last Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_middlename" label="Middle Name" />
                  </Grid>
                  <Grid item xs={4}>
                    <DateTimePicker name="s2_dob" label="Date of Birth" />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s2_sex" label="Gender" options={genders} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_healthnum" label="Health Number" />
                  </Grid>
                  <Grid item xs={6} style={{ paddingRight: '60px' }}>
                    <TextField name="s2_email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>I am this person’s:</Typography>
                    <div style={{ display: 'flex' }}>
                      <CheckBox name='s2_parentcheck' label='Parent' />
                      <CheckBox name='s2_legalcheck' label='Legal guardian' />
                      <CheckBox name='s2_autornycheck' label='attorney for personal care' />

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
                    <TextField name="s2_addressline1" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s2_city1" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_postalcode1" label="Postal Code" />
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
                    <CheckBox name="s2_mailingadd" label="Same as mailing address" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_addressline2" label="Address" multiline={true} rows={3} />
                  </Grid>
                  <Grid item xs={4}>
                    <Select name="s2_city2" label="City" options={cities} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="s2_postalcode2" label="Postal Code" />
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

export default Selection2;
